import './ProfileClient.scss';

import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button/Button';

import {serverAddress} from 'constants/ServerAddress';
import {buyer, seller} from 'constants/AuthorizationTypes';

// Данные для кнопки Посмотреть профиль
const editItemButton = {
  id: 'open_client_info',
  name: 'Посмотреть профиль',
};

/**
 * Класс ProfileClient - компонент, отображающий сведения о покупателе на странице продавца
 */
export default class ProfileClient extends PureComponent {
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
    // тип контрагента
    const userType = item.member.user_type;
    let content;

    switch (userType) {
      case buyer:
        content = <Fragment>
          <span className="consumer_name">
            Покупатель: {item.member.name}
          </span>
          <span className="consumer_address">
            Адрес: {item.member.address}
          </span>
          <span className="consumer_phone">
            Телефон: +7-{item.member.phone}
          </span>
        </Fragment>;
        break;
      case seller:
        content = <Fragment>
          <span className="consumer_name">
            Покупатель: {item.member.producer_brand}
          </span>
          <span className="consumer_address">
            Адрес: {item.member.producer_address}
          </span>
          <span className="consumer_phone">
            Телефон: +7-{item.member.producer_phone}
          </span>
        </Fragment>;
        break;
    }
    return (
      <p className="seller_item client_info">
        <img
          src={serverAddress + item.member.image}
          alt="Клиент"
        />
        <span className="consumer_info">
          {content}
        </span>
        <Button
          className="edit_button"
          variant="contained"
          color="primary"
          id={editItemButton.id}
          onClick={() => this.showClientInfo(item.member.id)}
        >
          {editItemButton.name}
        </Button>
      </p>
    );
  }
}