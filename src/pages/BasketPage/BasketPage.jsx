import './BasketPage.scss';

import React, { PureComponent } from 'react';
import BasketList from 'components/BasketList';
import BasketContacts from 'components/BasketContacts';

const basketItems = {
  'products': [
    {
      'cart_item_id': 1,
      'product_name': 'Квас №6',
      'product_price': 30,
      'product_quantity': 2,
      'product_id': 276,
      'product_link': '/api/products/276',
    },
    {
      'cart_item_id': 2,
      'product_name': 'Сиропы №1',
      'product_price': 70,
      'product_quantity': 1,
      'product_id': 277,
      'product_link': '/api/products/277',
    },
  ],
};
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

  render() {    
    return (
      <div className="basket_form">
        <div/>
        <BasketList basketItems={basketItems.products}/>
        <BasketContacts />
        <div/>
      </div>
    );
  }
}