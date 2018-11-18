import './SellerClient.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button/Button';

// TODO заменить на ссылку изображения с сервера
import PhotoMock from 'img/nophoto.jpg';

// Данные для кнопки Посмотреть профиль
const editItemButton = {
  id: 'open_client_info',
  name: 'Посмотреть профиль',
};

/**
 * Класс SellerClient - компонент, отображающий сведения о покурателе на странице продавца
 */
export default class SellerClient extends PureComponent {
// Проверка свойств
  static propTypes = {
    // Пункты меню - массив объектов
    item: PropTypes.shape({
      // имя покупателя
      name: PropTypes.string,
      // почта  покупателя
      email: PropTypes.string,
      // телефон  покупателя
      phone: PropTypes.string,
      // адресс  покупателя
      address: PropTypes.string,
      // изображение покупателя
      image: PropTypes.string,
      // ссылка на покупателя
      link: PropTypes.string,
    }),
    // Функция отображения сведений о клиенте
    itemHandle: PropTypes.func,
  };
  
  render() {
    const { item, itemHandle } = this.props;

    return (
      <p className="seller_item client_info">
        <img
          src={PhotoMock}
          alt="Клиент"
        />
        <span className="consumer_info">
          <span className="consumer_name">
            Покупатель: {item.consumer.name}
          </span>
          <span className="consumer_address">
            Адрес: {item.consumer.address}
          </span>
          <span className="consumer_phone">
            Телефон: +7-{item.consumer.phone}
          </span>
        </span>
        <Button
          className="edit_button"
          variant="contained"
          color="primary"
          id={editItemButton.id}
          onClick={() => itemHandle('client_profile')}
        >
          {editItemButton.name}
        </Button>
      </p>
    );
  }
}