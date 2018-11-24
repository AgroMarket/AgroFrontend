import './SellerItem.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/DeleteOutlineRounded';
import Button from '@material-ui/core/Button/Button';

import {serverAddress} from 'constants/ServerAddress';

// Данные для кнопки Добавить объявление
const editItemButton = {
  id: 'edit_item',
  name: 'Редактировать',
};

/**
 * Класс SellerItem - компонент, отображающий строку с описанием продаваемого товара на странице продавца
 */
export default class SellerItem extends PureComponent {
  // Проверка свойств
  static propTypes = {
    // Пункты меню - массив объектов
    item: PropTypes.shape({
      // изображение товара
      image: PropTypes.string,
      // название товара
      title: PropTypes.string,
      // единица измерения товара
      measures: PropTypes.string,
      // цена товара
      price: PropTypes.string,
      // id товара
      id: PropTypes.number,
    }),
    // Функция отображения формы редактирования товара
    itemHandle: PropTypes.func,
    getID: PropTypes.func,
    handleDeleteItem: PropTypes.func,
    itemNumber: PropTypes.number,
  };

  editItem = (itemID, id) => {
    this.props.itemHandle(itemID);
    this.props.getID(id);
};

  render() {
    const { item, handleDeleteItem, itemNumber } = this.props;
    return (
      <p className="seller_item">
        <img
          src={serverAddress + item.product.image}
          alt="Товар"
        />
        <span className="item_name">
          {item.product.title}
        </span>
        <span className="item_measures">
          1 {item.product.measures}
        </span>
        <span className="item_price">
          {item.product.price} руб. / 1 {item.product.measures}
        </span>
        <Button
          className="edit_button"
          variant="contained"
          color="primary"
          id={editItemButton.id}
          onClick={() => this.editItem('edit_product', item.product.id)}
        >
          {editItemButton.name}
        </Button>
        <Button
          className="delete_button"
          variant="fab"
          mini
          color="secondary"
          aria-label="Delete"
          onClick={() => handleDeleteItem(itemNumber, item.product.id)}
        >
          <DeleteIcon/>
        </Button>
      </p>
    );
  }
}