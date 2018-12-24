import './ProfileEdit.scss';

import React, {Fragment, PureComponent} from 'react';
import Button from '@material-ui/core/Button/Button';
import MyOrdersIcon from '@material-ui/icons/DateRange';
import PropTypes from 'prop-types';
import ActiveStorageProvider from 'react-activestorage-provider';

import {serverAddress} from 'constants/ServerAddress';
import {seller, buyer} from 'constants/AuthorizationTypes';

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
      inn: '',
      description: '',
      email: '',
      itemsLoaded: false,
      error: null,
    };
  }

  // Проверка свойств
  static propTypes = {
    userStatus: PropTypes.string,
    jwtToken: PropTypes.string,
    itemHandle: PropTypes.func,
  };

  componentDidMount() {
    const { userStatus, jwtToken } = this.props;

    fetch(`${serverAddress}/api/member/profile`, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        switch (userStatus) {
          case seller:
            this.setState(
              prevState => {
                return {
                  ...prevState,
                  name: res.result.member.producer_brand,
                  address: res.result.member.producer_address,
                  phone: res.result.member.producer_phone,
                  inn: res.result.member.producer_inn,
                  description: res.result.member.producer_descripion,
                  itemsLoaded: true,
                };
              }
            );
            break;
          case buyer:
            this.setState(
              prevState => {
                return {
                  ...prevState,
                  name: res.result.member.name,
                  email: res.result.member.email,
                  phone: res.result.member.phone,
                  address: res.result.member.address,
                  itemsLoaded: true,
                };
              }
            );
        }},
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

  profileChanged = profile => {
    const { jwtToken, itemHandle } = this.props;
    const itemJSON = JSON.stringify({
        'member': profile,
      });

    fetch(`${serverAddress}/api/member/profile`, {
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
          itemHandle('user_profile');
        }
      );
  };

  render() {
    const { error, itemsLoaded, name, address, phone, inn, description, email } = this.state;
    const { userStatus } = this.props;
    let userProfile, profileType, content;

    if (error) {
      return <p>Ошибка: {error.message}</p>;
    }
    else
    if (!itemsLoaded) {
      return <p className="load_info">Пожалуйста, подождите, идет загрузка страницы</p>;
    }
    else
      if (userStatus === seller) {
      profileType = 'seller_profile_parameters profile_parameters';
      userProfile = {
        producer_brand: name,
        producer_address: address,
        producer_phone: phone,
        producer_inn: inn,
        producer_description: description,
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
    else
      if (userStatus === buyer) {
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
          <ActiveStorageProvider 
            endpoint={{
              path: `${serverAddress}/api/member/profile`,
              model: 'Member',
              attribute: 'image',
              method: 'PUT',
              //host?: {serverAddress},
              
            }}
            onSubmit={user => this.setState({ avatar: user.avatar })}
            render={({ handleUpload, uploads, ready }) => (
              <div>
                <input
                  type="file"
                  disabled={!ready}
                  onChange={e => handleUpload(e.currentTarget.files)}
                />
          
                {uploads.map(upload => {
                  switch (upload.state) {
                    case 'waiting':
                      return <p key={upload.id}>Waiting to upload {upload.file.name}</p>;
                    case 'uploading':
                      return (
                        <p key={upload.id}>
                          Uploading {upload.file.name}: {upload.progress}%
                        </p>
                      );
                    case 'error':
                      return (
                        <p key={upload.id}>
                          Error uploading {upload.file.name}: {upload.error}
                        </p>
                      );
                    case 'finished':
                      return <p key={upload.id}>Finished uploading {upload.file.name}</p>;
                  }
                })}
              </div>
            )}
          />

          <Button
            className="save_item"
            variant="contained"
            color="primary"
            id={saveProfileButton.id}
            onClick={() => this.profileChanged(userProfile)}
          >
            {saveProfileButton.name}
          </Button>
        </div>
      </div>
    );
  }
}