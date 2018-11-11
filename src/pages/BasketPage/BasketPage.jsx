import './BasketPage.scss';

import React, { PureComponent } from 'react';
import BasketList from 'components/BasketList';
import BasketContacts from 'components/BasketContacts';
import PropTypes from 'prop-types';
import {serverAddress} from 'constants/ServerAddress';

/**
 * Класс BasketPage - компонент, отображающий страницу Корзина
 */
export default class BasketPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // товары в корзине
      basketItems: [],
      // состояние загрузки корзины
      basketLoaded: false,
      // ошибка загрузки
      error: null,
    };
  }

  // Проверка свойств
  static propTypes = {
    // ID корзины на сервере
    basketID: PropTypes.number,
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

  render() {
    const { error, basketItems, basketLoaded } = this.state;
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
          return (
            <div className="basket_form">
              <div/>
              <BasketList basketItems={basketItems.products} basketID={basketID}/>
              <BasketContacts basketID={basketID}/>
              <div/>
            </div>
          );
        }
    }
}