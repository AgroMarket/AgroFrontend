import './SellersPage.scss';

import React, { PureComponent } from 'react';

import SellerMenu from 'components/SellerMenu';
import SellerContent from 'components/SellerContent';

/**
 * Класс SellersPage - компонент, отображающий страницу Продавцам
 */
export default class SellersPage extends PureComponent {
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

  // Пользователь открывает карточку продажи товара
  sellItem = (event, itemID) => {
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
    const { openedSection } = this.state;
    return (
      <div className="seller_page">
        <div/>
        <h2 className="private_cab">Личный кабинет</h2>
        <div/>
        <div/>
        <div/>
        <SellerMenu
          className="seller_menu"
          section={this.changeSection}
        />
        <SellerContent
          openedSection={openedSection}
          itemHandle={this.sellItem}
        />
        <div/>
      </div>
    );
  }
}