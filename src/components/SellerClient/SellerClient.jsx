import './SellerClient.scss';

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
    getID: PropTypes.func,
  };

  showClientInfo = (itemID, id) => {
    this.props.itemHandle(itemID);
    this.props.getID(id);
  };

  render() {
    const { item } = this.props;

    return (
      <p className="seller_item client_info">
        <img
          src={serverAddress + item.consumer.image}
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
          onClick={() => this.showClientInfo('contragent_profile', item.consumer.id)}
        >
          {editItemButton.name}
        </Button>
      </p>
    );
  }
}