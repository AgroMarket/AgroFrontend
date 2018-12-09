import './ProfileSeller.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button/Button';

import {serverAddress} from 'constants/ServerAddress';

// Данные для кнопки Посмотреть профиль
const editItemButton = {
  id: 'open_client_info',
  name: 'Посмотреть профиль',
};

/**
 * Класс ProfileSeller - компонент, отображающий сведения о продавце
 */
export default class ProfileSeller extends PureComponent {
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
    getID: PropTypes.func,
  };

  showClientInfo = id => {
    this.props.itemHandle('contragent_profile');
    this.props.getID(id);
  };

  render() {
    const { item } = this.props;

    return (
      <p className="seller_item client_info">
        <img
          src={serverAddress + item.producer.logo}
          alt={item.producer.name}
        />
        <span className="consumer_info">
          <span className="consumer_name">
            Продавец: {item.producer.producer_brand}
          </span>
          <span className="consumer_address">
            Адрес: {item.producer.producer_address}
          </span>
          <span className="consumer_phone">
            Телефон: +7-{item.producer.producer_phone}
          </span>
        </span>
        <Button
          className="edit_button"
          variant="contained"
          color="primary"
          id={editItemButton.id}
          onClick={() => this.showClientInfo(item.producer.id)}
        >
          {editItemButton.name}
        </Button>
      </p>
    );
  }
}