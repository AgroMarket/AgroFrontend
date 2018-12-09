import './ProfileContragent.scss';

import React, {Fragment, PureComponent} from 'react';
import MyOrdersIcon from '@material-ui/icons/DateRange';
import PropTypes from 'prop-types';

import { serverAddress } from 'constants/ServerAddress';
import { seller, buyer } from 'constants/AuthorizationTypes';

/**
 * Класс ProfileContragent - компонент, отображающий профиль контрагента на странице личного кабинета
 */
export default class ProfileContragent extends PureComponent {
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
    fetch(`${serverAddress}/api/members/${id}`)
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
    // тип контрагента
    const userType = profile.user_type;
    let content, description, phone;

    if (error) {
      return <p>Ошибка: {error.message}</p>;
    }
    else
    if (!itemsLoaded) {
      return <p className="load_info">Пожалуйста, подождите, идет загрузка страницы</p>;
    }
    else {
      const mail = 'mailto:' + profile.email;
      switch (userType) {
        case buyer:
          phone = 'tel:+7-' + profile.phone;
          content = <Fragment>
            <span className="profile_name">
              {profile.name}
            </span>
            <span className="profile_address">
              Адрес: {profile.address}
            </span>
            <span className="profile_phone">
              Телефон: <a href={phone}>{profile.phone}</a>
            </span>
            <span className="profile_email">
              Электронная почта: <code><a href={mail}>{profile.email}</a></code>
            </span>
          </Fragment>;
          description = 'покупателя';
          break;
        case seller:
          phone = 'tel:+7-' + profile.producer_phone;
          content = <Fragment>
            <span className="profile_name">
              {profile.producer_brand}
            </span>
            <span className="profile_inn">
              ИНН {profile.producer_inn}
            </span>
            <span className="profile_address">
              Адрес: {profile.producer_address}
            </span>
            <span className="profile_phone">
              Телефон: <a href={phone}>{profile.producer_phone}</a>
            </span>
            <span className="profile_email">
              Электронная почта: <code><a href={mail}>{profile.email}</a></code>
            </span>
          </Fragment>;
          description = 'продавца';
          break;
      }
    }
    return (
      <div className="seller_items">
        <div className="seller_items_header">
          <MyOrdersIcon className="my_orders_icon"/>
          <h2>Профиль {description}</h2>
        </div>
        <div className="seller_profile">
          {content}
        </div>
      </div>
    );
  }
}