import './ProfileContragent.scss';

import React, { PureComponent} from 'react';
import MyOrdersIcon from '@material-ui/icons/DateRange';
import PropTypes from 'prop-types';

import {serverAddress} from 'constants/ServerAddress';

/**
 * Класс ProfileContragent - компонент, отображающий профиль контрагента на странице личного кабинета
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
    id: PropTypes.number,
    getID: PropTypes.func,
  };

  componentDidMount() {
    const {id, getID} = this.props;
    fetch(`${serverAddress}/api/consumers/${id}`)
      .then(res => res.json())
      .then(res => {
          this.setState(
            prevState => {
              return {
                ...prevState,
                profile: res,
                itemsLoaded: true,
              };
            }
          );
          getID(-1);
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

    if (error) {
      return <p>Ошибка: {error.message}</p>;
    }
    else
    if (!itemsLoaded) {
      return <p className="load_info">Пожалуйста, подождите, идет загрузка страницы</p>;
    }
    else
      return (
        <div className="seller_items">
          <div className="seller_items_header">
            <MyOrdersIcon className="my_orders_icon"/>
            <h2>Профиль</h2>
          </div>
          <div className="seller_profile">
            <span className="profile_name">
              {profile.consumer.name}
            </span>
            <span className="profile_address">
              Регион: {profile.consumer.address}
            </span>
            <span className="profile_phone">
                Телефон: +7-{profile.consumer.phone}
            </span>
            <span className="profile_email">
                Электронная почта: {profile.consumer.email}
            </span>
          </div>
        </div>
      );
  }
}