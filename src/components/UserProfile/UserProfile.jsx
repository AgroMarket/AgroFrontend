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
// Данные для кнопки Стать продавцом
const makeSellerButton = {
  id: 'make_seller',
  name: 'Стать продавцом',
};
// Данные для кнопки Перейти в личный кабинет продавца
const gotoNewAccountButton = {
  id: 'confirm_seller',
  name: 'Перейти в личный кабинет продавца',
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
      congratulation: false,
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
    let user;

    if (userStatus === seller)
      user = 'producer';
    if (userStatus === buyer)
      user = 'consumer';
    fetch(`${serverAddress}/api/${user}/profile`, {
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

  makeSeller = () => {
    const { jwtToken } = this.props;
    const sellerJSON = JSON.stringify({
      'consumer':
        {
          'type': 'Producer',
        },
    });

    this.setState(
      prevState => {
        return {
          ...prevState,
          itemsLoaded: false,
        };
      }
    );

    fetch(`${serverAddress}/api/consumer/profile`, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
      },
      method: 'put',
      body: sellerJSON,
    })
      .then(() => {
          this.setState(
            prevState => {
              return {
                ...prevState,
                congratulation: true,
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
  };

  gotoSellerAccount = () => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          congratulation: false,
        };
      }
    );
  };

  render() {
    const { error, profile, itemsLoaded, congratulation } = this.state;
    const { itemHandle, userStatus } = this.props;
    let content;

    if (error) {
      return <p>Ошибка: {error.message}</p>;
    }
    else
      if (!itemsLoaded) {
        return <p className="load_info">Пожалуйста, подождите, идет загрузка страницы</p>;
      }
      else
        if (congratulation) {
          return (
            <div className="congratulation_seller">
              <p>Поздравляем! Теперь Вы можете продавать товары на FermaStore</p>
              <Button
                className="edit_profile"
                variant="contained"
                color="primary"
                id={gotoNewAccountButton.id}
                onClick={() => this.gotoSellerAccount()}
              >
                {gotoNewAccountButton.name}
              </Button>
            </div>
          );
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
                  <Button
                    className="make_seller"
                    variant="contained"
                    color="primary"
                    id={makeSellerButton.id}
                    onClick={() => this.makeSeller()}
                  >
                    {makeSellerButton.name}
                  </Button>
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