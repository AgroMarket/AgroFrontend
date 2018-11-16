import './SellersPage.scss';

import React, { PureComponent } from 'react';
import SellerMenu from 'components/SellerMenu';
import SellerContent from 'components/SellerContent';

const menuItemsJSON = [
  {
    id: 'seller_items',
    name: 'Мой прилавок',
    component: 'SellerItems',
  },
  {
    id: 'seller_sells',
    name: 'Мои продажи',
    component: 'SellerSells',
  },
  {
    id: 'seller_clients',
    name: 'Мои клиенты',
    component: 'SellerClients',
  },
  {
    id: 'seller_profile',
    name: 'Мой профиль',
    component: 'SellerProfile',
  },
];

/**
 * Класс SellersPage - компонент, отображающий страницу Продавцам
 */
export default class SellersPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // TODO заменить заглушку на данные с сервера
      // пункты меню продавца
      menuItems: menuItemsJSON,
      // состояние загрузки товаров продавца
      itemsForSellLoaded: false,
      // при входе на страницу открывается список товаров, выставленных на продажу
      openedSection: 0,
      // адрес открытого пункта меню
      openedMenuItem: 'SellersItems',
      // ошибка загрузки
      error: null,
      // TODO добавить пагинацию для вывода товаров, выставленных на продажу
      // флаг включения пагинации on / off
      pagination: 'off',
    };
  }

  /**
   * Получает из SellerMenu и сохраняет в state номер текущего открытого раздела меню продавца
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

  // Пользователь открывает карточку создания нового товара
  createItem = (event, itemID) => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          openedItem: itemID,
        };
      }
    );
  };

  // Пользователь открывает карточку редактирования товара
  editItem = (event, itemID) => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          openedItem: itemID,
        };
      }
    );
  };

  render() {
    const {menuItems, openedSection} = this.state;
    return (
      <div className="seller_page">
        <div/>
        <SellerMenu menu={menuItems} section={this.changeSection} className="seller_menu"/>
        <SellerContent section={openedSection} itemHandle={this.createItem}/>
        <div/>
      </div>
    );
  }
}