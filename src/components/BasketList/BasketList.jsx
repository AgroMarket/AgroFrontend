import './BasketList.scss';

import React, { PureComponent} from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/DeleteOutlineRounded';
import BasketIcon from '@material-ui/icons/ShoppingCartOutlined';
import {serverAddress} from 'constants/ServerAddress';
import PropTypes from 'prop-types';

/**
 * Класс BasketList - компонент, отображающий товары на странице Корзина
 */
export default class BasketList extends PureComponent {
  // Проверка свойств
  static propTypes = {
    // Описание товара - объект
    basketItems: PropTypes.shape({
      products: PropTypes.arrayOf(PropTypes.shape({
        // название товара
        name: PropTypes.string,
        // цена товара
        price: PropTypes.number,
        // количество товара
        quantity: PropTypes.number,
        // изображение товара
        image: PropTypes.string,
        // общая стоимость товара
        sum: PropTypes.number,
      })),
      // общая стоимость товаров в корзине
      total: PropTypes.number,
    }),
    // ID корзины на сервере
    basketID: PropTypes.string,
    // стоимость доставки
    deliveryCost: PropTypes.number,
    // Функция изменения количества товаров в корзине
    handleCounterClick: PropTypes.func,
    // Функция удаления товаров в корзине
    handleDeleteItem: PropTypes.func,
  };

  render() {
    const { basketItems, deliveryCost, handleCounterClick, handleDeleteItem } = this.props;
    const sum = basketItems.cart_items.map(item => {
      // создаем массив из произведений цены и количества товара
      return item.cart_item.product.price * item.cart_item.quantity;
    })
      .reduce((price, current) => {
        // складываем все цены созданного массива
        return price + current;
      });

    return (
      <div className="basket_list">
        <h2>
          <BasketIcon className="basket_icon"/>
          Корзина
        </h2>
        <p className="items_title">
          <span className="table_title">Название товара</span>
          <span className="table_price">Цена за 1 ед.</span>
          <span className="table_counter">Количество</span>
          <span className="table_total">Общая стоимость</span>
          <span className="table_delete">Удалить</span>
        </p>
        {basketItems.cart_items.map((item, idx) => {
          return (
            <p className="basket_item" key={idx}>
              <img
                src={serverAddress + item.cart_item.product.image}
                alt={item.cart_item.product.name}
              />
              <span className="item_name">
                {item.cart_item.product.name}
              </span>
              <span className="item_price">
                {item.cart_item.product.price.toLocaleString('ru')} руб.
              </span>
              <Button
                className="remove_button"
                variant="fab"
                mini
                color="secondary"
                aria-label="Remove"
                onClick={() => handleCounterClick(idx, -1)}
              >
                <RemoveIcon/>
              </Button>
              <span className="item_quantity">
                {item.cart_item.quantity}
              </span>
              <Button
                className="add_button"
                variant="fab"
                mini
                color="secondary"
                aria-label="Add"
                onClick={() => handleCounterClick(idx, 1)}
              >
                <AddIcon/>
              </Button>
              <span className="item_full_price">
                {(item.cart_item.product.price * item.cart_item.quantity).toLocaleString('ru')} руб.
              </span>
              <Button
                className="item_delete"
                variant="fab"
                mini
                color="secondary"
                aria-label="Delete"
                onClick={() => handleDeleteItem(idx)}
              >
                <DeleteIcon/>
              </Button>
            </p>
          );
        })}
        <p className="basket_total">
          Общая стоимость доставки товаров в корзине: {deliveryCost.toLocaleString('ru')} руб.
        </p>
        <p className="basket_total">
          Общая стоимость товаров в корзине: {sum.toLocaleString('ru')} руб.
        </p>
        <p className="basket_total">
          Общая стоимость заказа с доставкой: {(deliveryCost + sum).toLocaleString('ru')} руб.
        </p>
      </div>
    );
  }
}