import './SellerItem.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/DeleteOutlineRounded';
import Button from '@material-ui/core/Button/Button';

// TODO заменить на ссылку изображения с сервера
import PhotoMock from 'img/nophoto.jpg';

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
    }),
  };

  render() {
    const { item } = this.props;
    return (
      <p className="seller_item">
        <img
          src={PhotoMock}
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
        >
          {editItemButton.name}
        </Button>
        <Button
          className="delete_button"
          variant="fab"
          mini
          color="secondary"
          aria-label="Delete"
        >
          <DeleteIcon/>
        </Button>
      </p>
    );
  }
}