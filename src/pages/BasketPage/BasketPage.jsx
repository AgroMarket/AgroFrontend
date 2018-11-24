import './BasketPage.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import BasketList from 'components/BasketList';
import BasketContacts from 'components/BasketContacts';
import BasketFinish from 'components/BasketFinish';
import {serverAddress} from 'constants/ServerAddress';
import {register} from 'helpers/register';
import {login} from 'helpers/login';
import {order} from 'helpers/order';

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
    setToken: PropTypes.func,
    jwtToken: PropTypes.string,
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
    if (count === -1 && this.state.basketItems.products[item_number].product.quantity === 1)
      return;
    const itemJSON = JSON.stringify({
      'cart_item':
        {
          'quantity': this.state.basketItems.products[item_number].product.quantity + count,
        },
    });
    fetch(`${serverAddress}/api/carts/${this.props.basketID}/cart_items/${this.state.basketItems.products[item_number].product.cart_item_id}`, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: itemJSON,
    })
      .then(() => {
        const newBasketItems = Object.assign({}, this.state.basketItems);
        newBasketItems.products[item_number].product.quantity += count;
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
    fetch(`${serverAddress}/api/carts/${this.props.basketID}/cart_items/${this.state.basketItems.products[item_number].product.cart_item_id}`, {
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

  /**
   * Оформляет заказ на сервере
   * @param serverAddress адрес сервера
   * @param basketID id корзины на сервере
   * @param jwtToken jwt токен аутентификации
   */
  doOrder = (serverAddress, basketID, jwtToken) => {
    order(serverAddress, basketID, jwtToken)
      .then(res => res.json())
      .then(() => {
        this.setState(
          prevState => {
            return {
              ...prevState,
              orderFinish: true,
            };
          }
        );
      })
      .then(
        () => fetch(`${serverAddress}/api/carts/${this.props.basketID}`, {
          method: 'delete',
        })
          .then(() => {
            this.setState(
              prevState => {
                return {
                  ...prevState,
                  basketItems: {},
                };
              }
            );
          })
      );
  };

  handleOrderClick = user => {
    const { setToken, jwtToken, basketID } = this.props;

    if(jwtToken === '') {
      register(serverAddress, user.email, user.password, user.name, user.phone, user.address)
        .then(res => res.json())
        .then(() => {
          login(serverAddress, user.email, user.password)
            .then(res => res.json())
            .then(res => {
              setToken(res.jwt);
              this.doOrder(serverAddress, basketID, res.jwt);
            });
        });
    } else {
      this.doOrder(serverAddress, basketID, jwtToken);
    }
  };

  render() {
    const { error, basketItems, basketLoaded, orderFinish } = this.state;
    const { basketID, jwtToken } = this.props;
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
              <div className="basket_page">
                <div/>
                <div className="basket_container">
                <BasketList
                  basketItems={basketItems}
                  basketID={basketID}
                  handleCounterClick={this.handleCounterClick}
                  handleDeleteItem={this.handleDeleteItem}
                />
                <BasketContacts
                  basketID={basketID}
                  handleOrderClick={this.handleOrderClick}
                  jwtToken={jwtToken}
                />
                </div>
                <div/>
              </div>
            );
        }
    }
}