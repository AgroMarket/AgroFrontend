import './BasketPage.scss';

import React, { PureComponent } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button/Button';
import BasketList from 'components/BasketList';
import BasketContacts from 'components/BasketContacts';
import BasketFinish from 'components/BasketFinish';
import {serverAddress} from 'constants/ServerAddress';
import {register} from 'helpers/register';
import {login} from 'helpers/login';
import {order} from 'helpers/order';

const linkToLogin = props => <Link to="/login" {...props}/>;

// Данные для кнопки Вернуться в корзину
const backToBasketButton = {
  id: 'back_to_basket',
  name: 'Вернуться в корзину',
};
// Данные для кнопки Проверить счет в личном кабинете
const gotoAccountButton = {
  id: 'back_to_basket',
  name: 'Проверить счет в личном кабинете',
};

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
      // флаг недостаточно денег на счете
      noMoney: false,
      // сумма, которой не хватает на оплату
      needMoney: 0,
      // стоимость доставки
      deliveryCost: 0,
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
                basketItems: res.result.cart,
                basketLoaded: true,
                deliveryCost: res.result.cart.delivery_cost,
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
    if (count === -1 && this.state.basketItems.cart_items[item_number].cart_item.quantity === 1)
      return;
    const itemJSON = JSON.stringify({
      'cart_item':
        {
          'quantity': this.state.basketItems.cart_items[item_number].cart_item.quantity + count,
        },
    });
    fetch(`${serverAddress}/api/carts/${this.props.basketID}/cart_items/${this.state.basketItems.cart_items[item_number].cart_item.id}`, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: itemJSON,
    })
      .then(() => {
        const newBasketItems = Object.assign({}, this.state.basketItems);
        newBasketItems.cart_items[item_number].cart_item.quantity += count;
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
    const { basketItems } = this.state;
    const { basketID } = this.props;

    fetch(`${serverAddress}/api/carts/${basketID}/cart_items/${basketItems.cart_items[item_number].cart_item.id}`, {
      method: 'delete',
    })
      .then(() => {
        const newBasketItems = Object.assign({}, basketItems);
        newBasketItems.cart_items.splice(item_number, 1);
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
   * @param jwtToken jwt токен аутентификации
   */
  doOrder = (serverAddress, jwtToken) => {
    const { basketID } = this.props;

    order(serverAddress, basketID, jwtToken)
      .then(res => res.json())
      .then(res => {
        if (res.message !== 'На счёте недостаточно средств') {
          // Очищаем корзину
          fetch(`${serverAddress}/api/carts/${basketID}`, {
            method: 'delete',
          })
            .then(() => {
              this.setState(
                prevState => {
                  return {
                    ...prevState,
                    orderFinish: true,
                  };
                }
              );
            });
        }
        else
          this.setState(
            prevState => {
              return {
                ...prevState,
                noMoney: true,
                needMoney: res.result.need_money,
              };
            }
          );
      });
  };

  handleOrderClick = user => {
    const { setToken, jwtToken } = this.props;

    if(jwtToken === '') {
      register(serverAddress, user.email, user.password, user.name, user.phone, user.address)
        .then(res => res.json())
        .then(() => {
          login(serverAddress, user.email, user.password)
            .then(res => res.json())
            .then(res => {
              setToken(res.jwt);
              this.doOrder(serverAddress, res.jwt);
            });
        });
    } else {
      this.doOrder(serverAddress, jwtToken);
    }
  };

  reset = () => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          noMoney: false,
          needMoney: 0,
        };
      }
    );
  };

  render() {
    const { error, basketItems, basketLoaded, orderFinish, noMoney, needMoney, deliveryCost } = this.state;
    const { basketID, jwtToken } = this.props;

    if (orderFinish)
      return (
        <div className="basket_finish">
          <div/>
          <BasketFinish/>
          <div/>
        </div>
      );
    else
      if (error) {
        return <p>Ошибка: {error.message}</p>;
      }
      else
        if (!basketLoaded) {
          return <p className="load_info">Пожалуйста, подождите, идет загрузка страницы</p>;
        }
        else
          if (basketItems === undefined || basketItems.length === 0 || basketItems.cart_items === undefined || basketItems.cart_items.length === 0) {
            return (
            <div className="load_info">
              <div/>
              <p>Ваша корзина пуста</p>
            </div>
            );
          }
          else
            if (noMoney) {
              return (
                <div className="no_money">
                  <p>Вам не хватает {needMoney} руб. для оплаты покупки. Пожалуйста, пополните счет или удалите товары из корзины.</p>
                  <Button
                    className="no_money_buttons"
                    variant="contained"
                    color="primary"
                    id={backToBasketButton.id}
                    onClick={() => this.reset()}
                  >
                    {backToBasketButton.name}
                  </Button>
                  <Button
                    className="goto_profile"
                    component={linkToLogin}
                    variant="contained"
                    color="primary"
                    id={gotoAccountButton.id}
                  >
                    {gotoAccountButton.name}
                  </Button>
                </div>
              );
            }
            else
              return (
                <div className="basket_page">
                  <div/>
                  <div className="basket_container">
                  <BasketList
                    basketItems={basketItems}
                    basketID={basketID}
                    deliveryCost={deliveryCost}
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