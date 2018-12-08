import './UserProfile.scss';

import React, {Fragment, PureComponent} from 'react';
import { Redirect } from 'react-router';
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
    const { jwtToken } = this.props;
    fetch(`${serverAddress}/api/member/profile`, {
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
                profile: res.result.member,
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
      'member':
        {
          'user_type': 'producer',
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

    fetch(`${serverAddress}/api/member/profile`, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
      },
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
          return <Redirect to="/login"/>;
        }
        else {
          if (userStatus === seller)
            content = <Fragment>
              <span className="profile_name">
                Название: {profile.producer_brand}
              </span>
              <span className="profile_address">
                Регион: {profile.producer_address}
              </span>
              <span className="profile_phone">
                Телефон: +7-{profile.producer_phone}
              </span>
              <span className="profile_inn">
                ИНН: {profile.producer_inn}
              </span>
              <span className="profile_description">
                О нас: {profile.producer_descripion}
              </span>
            </Fragment>;
            else
              if (userStatus === buyer)
                content = <Fragment>
                  <span className="profile_name">
                    {profile.name}
                  </span>
                    <span className="profile_address">
                    Регион: {profile.address}
                  </span>
                    <span className="profile_phone">
                    Телефон: +7-{profile.phone}
                  </span>
                    <span className="profile_email">
                    Электронная почта: {profile.email}
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