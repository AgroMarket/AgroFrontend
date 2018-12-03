import './UserProfile.scss';

import React, {Fragment, PureComponent} from 'react';
import Button from '@material-ui/core/Button/Button';
import MyOrdersIcon from '@material-ui/icons/DateRange';
import PropTypes from 'prop-types';

import {serverAddress} from 'constants/ServerAddress';
import {seller, buyer} from 'constants/AuthorizationTypes';

// Данные для кнопки Редактировать профиль
const editProfileButton = {
  id: 'open_profile',
  name: 'Редактировать профиль',
};

/**
 * Класс UserProfile - компонент, отображающий профиль пользовательских настроек на странице личного кабинета
 */
export default class UserProfile extends PureComponent {
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
    userStatus: PropTypes.string,
  };

  componentDidMount() {
    const {jwtToken, userStatus} = this.props;
    let profile;

    if (userStatus === seller)
      profile = `${serverAddress}/api/producer/profile`;
    else
      if (userStatus === buyer)
        profile = `${serverAddress}/api/consumer/profile`;
    fetch(profile, {
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
    const { itemHandle, userStatus } = this.props;
    let content;

    if (error) {
      return <p>Ошибка: {error.message}</p>;
    }
    else
      if (!itemsLoaded) {
        return <p className="load_info">Пожалуйста, подождите, идет загрузка страницы</p>;
      }
      else {
        if (userStatus === seller)
          content = <Fragment>
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
          </Fragment>;
          else
            if (userStatus === buyer)
              content = <Fragment>
                <span className="profile_name">
                  {profile.profile.name}
                </span>
                    <span className="profile_address">
                  Регион: {profile.profile.address}
                </span>
                    <span className="profile_phone">
                    Телефон: +7-{profile.profile.phone}
                </span>
                    <span className="profile_email">
                    Электронная почта: {profile.profile.email}
                </span>
              </Fragment>;
        return (
          <div className="seller_items">
            <div className="seller_items_header">
              <MyOrdersIcon className="my_orders_icon"/>
              <h2>Мой профиль</h2>
            </div>
            <div className="seller_profile">
              {content}
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