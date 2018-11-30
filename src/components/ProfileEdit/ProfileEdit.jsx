import './ProfileEdit.scss';

import React, {Fragment, PureComponent} from 'react';
import Button from '@material-ui/core/Button/Button';
import MyOrdersIcon from '@material-ui/icons/DateRange';
import PropTypes from 'prop-types';

import {serverAddress} from 'constants/ServerAddress';

// Данные для кнопки Сохранить изменения
const saveProfileButton = {
  id: 'save_profile',
  name: 'Сохранить изменения',
};
// Данные для кнопки Загрузить фотографию профиля
const loadProfilePhotoButton = {
  id: 'open_profile',
  name: 'Загрузить фотографию профиля',
};

/**
 * Класс ProfileEdit - компонент, отображающий форму редактирования профиля на странице личного кабинета
 */
export default class ProfileEdit extends PureComponent {
  constructor(props) {
    super(props);
    
    // значения полей, используемых в render()
    this.state = {
      name: '',
      address: '',
      phone: '',
      inn: -1,
      description: '',
      email: '',
      itemsLoaded: false,
      error: null,

    };
  }

  // Проверка свойств
  static propTypes = {
    seller: PropTypes.bool,
    jwtToken: PropTypes.string,
    itemHandle: PropTypes.func,
  };

  componentDidMount() {
    const { seller, jwtToken } = this.props;
    let profile;

    if (seller)
      profile = `${serverAddress}/api/producer/profile`;
    else
      profile = `${serverAddress}/api/consumer/profile`;
    fetch(profile, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        if (seller) {
          this.setState(
            prevState => {
              return {
                ...prevState,
                name: res.result.producer.producer_brand,
                address: res.result.producer.producer_address,
                phone: res.result.producer.producer_phome,
                inn: res.result.producer.inn,
                description: res.result.producer.producer_descripion,
                itemsLoaded: true,
              };
            }
          );
        }
        else
          this.setState(
            prevState => {
              return {
                ...prevState,
                name: res.result.consumer.name,
                email: res.result.consumer.email,
                phone: res.result.consumer.phone,
                address: res.result.consumer.address,
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

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  profileChanged = (itemID, profile) => {
    const { jwtToken, itemHandle, seller } = this.props;
    let itemJSON, request;
    if (seller) {
      itemJSON = JSON.stringify({
        'producer': profile,
      });
      request = `${serverAddress}/api/producer/profile`;
    }
    else {
      itemJSON = JSON.stringify({
        'consumer': profile,
      });
      request = `${serverAddress}/api/consumer/profile`;
    }

    fetch(request, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
      },
      body: itemJSON,
    })
      .then(
        () => {
          itemHandle(itemID);
        }
      );
  };

  render() {
    const { error, itemsLoaded, name, address, phone, inn, description, email } = this.state;
    const { seller } = this.props;
    let userProfile, profileType, content;

    if (error) {
      return <p>Ошибка: {error.message}</p>;
    }
    else
    if (!itemsLoaded) {
      return <p className="load_info">Пожалуйста, подождите, идет загрузка страницы</p>;
    }
    else
      if (seller) {
      profileType = 'seller_profile_parameters profile_parameters';
      userProfile = {
        producer_brand: name,
        producer_address: address,
        producer_phome: phone,
        inn: inn,
        producer_descripion: description,
      };
      content = <Fragment>
        <div className="left_profile_parameters">
          <input
            type="text"
            id="label_name"
            name="name"
            placeholder=" "
            value={name}
            onChange={this.handleChange}
          />
          <label
            className="item_name"
            htmlFor="label_name"
          >
            Имя (название) производителя
          </label>
          <input
            type="text"
            id="label_inn"
            name="inn"
            placeholder=" "
            value={inn}
            onChange={this.handleChange}
          />
          <label
            className="item_inn"
            htmlFor="label_inn"
          >
            ИНН
          </label>
          <input
            type="text"
            id="label_address"
            name="address"
            placeholder=" "
            value={address}
            onChange={this.handleChange}
          />
          <label
            className="item_address"
            htmlFor="label_address"
          >
            Адрес
          </label>
          <input
            type="text"
            id="label_phone"
            name="phone"
            placeholder=" "
            value={phone}
            onChange={this.handleChange}
          />
          <label
            className="item_phone"
            htmlFor="label_phone"
          >
            Телефон
          </label>
        </div>
        <div className="right_profile_parameters">
            <textarea
              id="label_description"
              name="description"
              placeholder=' '
              value={description}
              onChange={this.handleChange}
            />
          <label
            className="item_description"
            htmlFor="label_description"
          >
            Описание
          </label>
        </div>
      </Fragment>;
    }
    else {
      profileType = 'profile_parameters';
      userProfile = {
        name: name,
        email: email,
        phone: phone,
        address: address,
      };
      content = <Fragment>
        <div className="left_profile_parameters">
          <input
            type="text"
            id="label_name"
            name="name"
            placeholder=" "
            value={name}
            onChange={this.handleChange}
          />
          <label
            className="item_name"
            htmlFor="label_name"
          >
            Ваше имя
          </label>
          <input
            type="text"
            id="label_email"
            name="email"
            placeholder=" "
            value={email}
            onChange={this.handleChange}
          />
          <label
            className="item_email"
            htmlFor="label_email"
          >
            Электронная почта
          </label>
          <input
            type="text"
            id="label_address"
            name="address"
            placeholder=" "
            value={address}
            onChange={this.handleChange}
          />
          <label
            className="item_address"
            htmlFor="label_address"
          >
            Адрес
          </label>
          <input
            type="text"
            id="label_phone"
            name="phone"
            placeholder=" "
            value={phone}
            onChange={this.handleChange}
          />
          <label
            className="item_phone"
            htmlFor="label_phone"
          >
            Телефон
          </label>
        </div>
        <div/>
      </Fragment>;
    }
    return (
      <div className="seller_items">
        <div className="seller_items_header">
          <MyOrdersIcon className="my_orders_icon"/>
          <h2>Профиль</h2>
        </div>
        <div className={profileType}>
          {content}
          <div/>
          <div/>
          <input
            accept="image/*"
            className="load_photo"
            id="flat-button-file"
            placeholder=" "
            multiple
            type="file"
          />
          <label className="item_load" htmlFor="flat-button-file">
            <Button
              component="span"
              className="load_item_photo"
              variant="text"
              color="primary"
              id={loadProfilePhotoButton.id}
            >
              {loadProfilePhotoButton.name}
            </Button>
          </label>
          <Button
            className="save_item"
            variant="contained"
            color="primary"
            id={saveProfileButton.id}
            onClick={() => this.profileChanged('user_profile', userProfile)}
          >
            {saveProfileButton.name}
          </Button>
        </div>
      </div>
    );
  }
}