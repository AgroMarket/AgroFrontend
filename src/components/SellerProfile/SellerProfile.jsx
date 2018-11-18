import './SellerProfile.scss';

import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button/Button';
import MyOrdersIcon from '@material-ui/icons/DateRange';
import PropTypes from 'prop-types';

// Данные для кнопки Редактировать профиль
const editProfileButton = {
  id: 'open_profile',
  name: 'Редактировать профиль',
};

// TODO заменить заглушку с товарами на данные с сервера
const profileJSON = {
  'status': 200,
  'message': 'Профиль производителя',
  'result': {
    'profile': {
      'id': 7,
      'brand': 'Farmer2',
      'address': 'Владикавказ',
      'phome': '450-296-7653',
      'inn': '150072240',
      'descripion': 'Next level yr DIY +1 blog. Readymade quinoa banh mi mlkshk craft beer iPhone. Craft beer Banksy mlkshk etsy art you probably havent heard of them vice Shoreditch.',
      'logo': '',
      'sertificates': [],
      'link': '/api/producers/7',
    },
  },
  'error': null,
};

/**
 * Класс SellerProfile - компонент, отображающий профиль на странице продавца
 */
export default class SellerProfile extends PureComponent {
  constructor(props) {
    super(props);
    
    // значения полей, используемых в render()
    this.state = {
      // данные профиля
      profile: profileJSON.result,
    };
  }

  // Проверка свойств
  static propTypes = {
    // Функция отображения формы редактирования или создания товара
    itemHandle: PropTypes.func,
  };

  render() {
    const { profile } = this.state;
    const { itemHandle } = this.props;
    return (
      <div className="seller_items">
        <div className="seller_items_header">
          <MyOrdersIcon className="my_orders_icon"/>
          <h2>Мой профиль</h2>
        </div>
        <div className="seller_profile">
          <span className="profile_name">
            {profile.profile.brand}
          </span>
          <span className="profile_address">
            Регион: {profile.profile.address}
          </span>
          <span className="profile_phone">
            Телефон: {profile.profile.phome}
          </span>
          <span className="profile_inn">
            ИНН: {profile.profile.inn}
          </span>
          <span className="profile_description">
            {profile.profile.descripion}
          </span>
          <Button
            className="edit_profile"
            variant="contained"
            color="primary"
            id={editProfileButton.id}
            onClick={() => itemHandle('edit_profile')}
          >
          {editProfileButton.name}
        </Button>
        </div>
      </div>
    );
  }
}