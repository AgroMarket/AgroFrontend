import './ProfilePage.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ProfileMenu from 'components/ProfileMenu';
import ProfileContent from 'components/ProfileContent';

/**
 * Класс ProfilePage - компонент, отображающий страницу Личный кабинет
 */
export default class ProfilePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // состояние загрузки товаров продавца
      itemsForSellLoaded: false,
      // при входе на страницу открывается список товаров, выставленных на продажу
      openedSection: 'seller_items',
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
    const { openedSection } = this.state;
    const { handleLogout, jwtToken } = this.props;
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
        />
        <ProfileContent
          openedSection={openedSection}
          itemHandle={this.itemHandle}
          jwtToken={jwtToken}
        />
        <div/>
      </div>
    );
  }
}