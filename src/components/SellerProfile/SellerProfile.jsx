import './SellerProfile.scss';

import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button/Button';
import MyOrdersIcon from '@material-ui/icons/DateRange';
import PropTypes from 'prop-types';

import {serverAddress} from 'constants/ServerAddress';

// Данные для кнопки Редактировать профиль
const editProfileButton = {
  id: 'open_profile',
  name: 'Редактировать профиль',
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
      profile: {},
      itemsLoaded: false,
    };
  }

  // Проверка свойств
  static propTypes = {
    // Функция отображения формы редактирования или создания товара
    itemHandle: PropTypes.func,
    jwtToken: PropTypes.string,
  };

  componentDidMount() {
    const {jwtToken} = this.props;
    fetch(`${serverAddress}/api/producer/profile`, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
      },
    })
      .then(res => res.json())
      .then(res => {
          this.setState(
            prevState => {
              return {
                ...prevState,
                profile: res.result,
                itemsLoaded: true,
              };
            }
          );
        },
        error => {
          this.setState({
            itemsLoaded: true,
            error,
          });
        });
  }

  render() {
    const { error, profile, itemsLoaded } = this.state;
    const { itemHandle } = this.props;
    if (error) {
      return <p>Ошибка: {error.message}</p>;
    }
    else if (!itemsLoaded) {
      return <p className="load_info">Пожалуйста, подождите, идет загрузка страницы</p>;
    }
    else {
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
              Телефон: +7-{profile.profile.phome}
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
}