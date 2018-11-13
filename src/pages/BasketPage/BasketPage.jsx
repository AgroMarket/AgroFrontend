import './BasketPage.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import BasketList from 'components/BasketList';
import BasketContacts from 'components/BasketContacts';
import BasketFinish from 'components/BasketFinish';
import {serverAddress} from 'constants/ServerAddress';
// TODO Корзина должна хранится даже при обновлении страницы

/**
 * Класс BasketPage - компонент, отображающий страницу Корзина
 */
export default class BasketPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // товары в корзине
      basketItems: {},
      // состояние загрузки корзины
      basketLoaded: false,
      // ошибка загрузки
      error: null,
      // состояние оформления заказа
      orderFinish: false,
    };
  }

  // Проверка свойств
  static propTypes = {
    // ID корзины на сервере
    basketID: PropTypes.string,
  };

  componentDidMount() {
    fetch(`${serverAddress}/api/carts/${this.props.basketID}`)
      .then(res => res.json())
      .then(res => {
          this.setState(
            prevState => {
              return {
                ...prevState,
                basketItems: res.result,
                basketLoaded: true,
              };
            }
          );
        },
        error => {
          this.setState({
            basketLoaded: true,
            error,
          });
        });
  }

  /**
   * Обрабатывает щелчки по кнопкам с количеством товара
   * @param item_number порядковый номер товара в корзине
   * @param count количество добавляемого товара
   */
  handleCounterClick = (item_number, count) => {
    if (count === -1 && this.state.basketItems.products[item_number].product_quantity === 1)
      return;
    const itemJSON = JSON.stringify({
      'item':
        {
          'quantity': this.state.basketItems.products[item_number].product_quantity + count,
        },
    });
    fetch(`${serverAddress}/api/carts/${this.props.basketID}/items/${this.state.basketItems.products[item_number].cart_item_id}`, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: itemJSON,
    })
      .then(() => {
        const newBasketItems = Object.assign({}, this.state.basketItems);
        newBasketItems.products[item_number].product_quantity = newBasketItems.products[item_number].product_quantity + count;
        this.setState(
          prevState => {
            return {
              ...prevState,
              basketItems: newBasketItems,
            };
          }
        );
      });
  };

  // обработка щелчков по кнопке Удалить товар
  handleDeleteItem = item_number => {
    fetch(`${serverAddress}/api/carts/${this.props.basketID}/items/${this.state.basketItems.products[item_number].cart_item_id}`, {
      method: 'delete',
    })
      .then(() => {
        const newBasketItems = Object.assign({}, this.state.basketItems);
        newBasketItems.products.splice(item_number, 1);
        this.setState(
          prevState => {
            return {
              ...prevState,
              basketItems: newBasketItems,
            };
          }
        );
      });
  };

  // TODO обработка щелчков по кнопке Оформить заказ
  handleOrderClick = () => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          orderFinish: true,
        };
      }
    );
  };

  render() {
    const { error, basketItems, basketLoaded, orderFinish } = this.state;
    const { basketID } = this.props;
    if (error) {
      return <p>Ошибка: {error.message}</p>;
    }
    else
      if (!basketLoaded) {
        return <p className="load_info">Пожалуйста, подождите, идет загрузка страницы</p>;
      }
      else
        if (basketItems === undefined || basketItems.length === 0 || basketItems.products === undefined || basketItems.products.length === 0) {
          return (
          <div className="load_info">
            <div/>
            <p>Ваша корзина пуста</p>
          </div>
          );
        }
        else {
          if (orderFinish)
            return (
              <div className="basket_finish">
                <div/>
                  <BasketFinish/>
                <div/>
              </div>
            );
          else
            return (
              <div className="basket_form">
                <div/>
                <BasketList
                  basketItems={basketItems}
                  basketID={basketID}
                  handleCounterClick={this.handleCounterClick}
                  handleDeleteItem={this.handleDeleteItem}
                />
                <BasketContacts
                  basketID={basketID}
                  handleOrderClick={this.handleOrderClick}
                />
                <div/>
              </div>
            );
        }
    }
}