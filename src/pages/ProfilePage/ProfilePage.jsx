import './ProfilePage.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ProfileMenu from 'components/ProfileMenu';
import ProfileContent from 'components/ProfileContent';
import {serverAddress} from 'constants/ServerAddress';

/**
 * Класс ProfilePage - компонент, отображающий страницу Личный кабинет
 */
export default class ProfilePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // при входе на страницу открывается список покупок
      openedSection: 'profile_account',
      // является ли пользователь продавцом
      seller: false,
      // загружен ли профиль пользователя
      profileLoaded: false,
      // ошибка загрузки
      error: null,
      // TODO добавить пагинацию для вывода товаров, выставленных на продажу
      // флаг включения пагинации on / off
      pagination: 'off',
    };
  }

  // Проверка свойств
  static propTypes = {
    // функция обратного вызова в родительский компонент
    handleLogout: PropTypes.func,
    jwtToken: PropTypes.string,
  };

  componentDidMount() {
    const { jwtToken } = this.props;
    fetch(`${serverAddress}/api/consumer/profile`, {
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
                   // устанавливаем является ли пользователь продавцом
                   seller: res.result.consumer.role === 'Producer',
                   profileLoaded: true,
                 };
               }
             );
           },
           error => {
             this.setState({
               profileLoaded: true,
               error,
             });
           });
  }

  /**
   * Получает из ProfileMenu и сохраняет в state номер текущего открытого раздела меню продавца
   * @param sectionID id выбранного пользователем раздела меню продавца
   */
  changeSection = sectionID => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          openedSection: sectionID,
        };
      }
    );
  };

  // Пользователь щелкает кнопку создания или редактирования товара, открытия заказа,
  // просмотра профиля покупателя, редактирования своего профиля
  itemHandle = itemID => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          openedSection: itemID,
        };
      }
    );
  };

  render() {
    const { openedSection, seller, profileLoaded, error } = this.state;
    const { handleLogout, jwtToken }  = this.props;

    if (error) {
      return <p>Ошибка: {error.message}</p>;
    }
    else
    if (!profileLoaded) {
      return <p className="load_info">Пожалуйста, подождите, идет загрузка страницы</p>;
    }
    else
      return (
        <div className="seller_page">
          <div/>
          <h2 className="private_cab">Личный кабинет</h2>
          <div/>
          <div/>
          <div/>
          <ProfileMenu
            className="seller_menu"
            section={this.changeSection}
            handleLogout={handleLogout}
            seller={seller}
          />
          <ProfileContent
            openedSection={openedSection}
            itemHandle={this.itemHandle}
            jwtToken={jwtToken}
            newItemCreated={this.newItemCreated}
            seller={seller}
          />
          <div/>
        </div>
      );
  }
}