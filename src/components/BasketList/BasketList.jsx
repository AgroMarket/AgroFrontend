import './BasketList.scss';

import React, { PureComponent} from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/DeleteOutlineRounded';
import BasketIcon from '@material-ui/icons/ShoppingCartOutlined';
import {serverAddress} from '../../constants';
import PropTypes from 'prop-types';

/**
 * Класс BasketList - компонент, отображающий товары на странице Корзина
 */
export default class BasketList extends PureComponent {
  // Проверка свойств
  static propTypes = {
    // Описание товара - объект
    basketItems: PropTypes.arrayOf(PropTypes.shape({
      // название товара
      product_name: PropTypes.string,
      // цена товара
      product_price: PropTypes.number,
      // количество товара
      product_quantity: PropTypes.number,
    })),
  };
  
  render() {
    const { basketItems } = this.props;
    const sum = basketItems.map(item => {
      // создаем массив из произведений цены и количества товара
      return item.product_price*item.product_quantity;
    })
      .reduce((price, current) => {
        // складываем все цены созданного массива
        return price + current;
      });
    // TODO убрать заглушку для картинки товара
    return (
      <div className="basket_list">
        <h2>
          <BasketIcon className="basket_icon"/>
          Корзина
        </h2>
        {basketItems.map( (item, idx) => {
          return (
            <p key={idx}>
              <img src={serverAddress+'/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBHdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d4923ad601f121901e3f572e59278b0f695ee0d4/missing.png'}/>
              <span className="item_name">
                {item.product_name}
              </span>
              <span className="item_price">
                {item.product_price} руб.
              </span>
              <Button
                variant="fab"
                mini
                color="secondary"
                aria-label="Add"
              >
                <AddIcon />
              </Button>
              <span className="item_quantity">
                {item.product_quantity}
              </span>
              <Button
                variant="fab"
                mini
                color="secondary"
                aria-label="Remove"
              >
                <RemoveIcon />
              </Button>
              <span className="item_full_price">
                {item.product_price*item.product_quantity} руб.
              </span>
              <Button
                variant="fab"
                mini
                color="secondary"
                aria-label="Delete"
              >
                <DeleteIcon />
              </Button>
            </p>
          );
        })}
        <p>
          Итого: {sum} руб.
        </p>
      </div>
    );
  }
}