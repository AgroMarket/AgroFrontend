import './SellerContent.scss';

import React, { PureComponent } from 'react';
import SellerItems from 'components/SellerItems';
import PropTypes from 'prop-types';
import SellerSells from 'components/SellerSells';
import SellerProfile from 'components/SellerProfile';
import SellerClients from 'components/SellerClients';

/**
 * Класс SellerContent - компонент, отображающий данные для выбранного пункта меню на странице продавца
 */
export default class SellerContent extends PureComponent {
  // Проверка свойств
  static propTypes = {
    // Функция отображения формы продажи товара
    itemHandle: PropTypes.func,
    // открытый пункт меню
    openedSection: PropTypes.string,
  };

  render() {
    const { openedSection, itemHandle } = this.props;
    switch (openedSection) {
      case 'seller_items':
        return (
          <div className="seller_content">
            <SellerItems itemHadle={itemHandle}/>
          </div>
        );
      case 'seller_sells':
        return (
          <div className="seller_content">
            <SellerSells/>
          </div>
        );
      case 'seller_clients':
        return (
          <div className="seller_content">
            <SellerClients/>
          </div>
        );
      case 'seller_profile':
        return (
          <div className="seller_content">
            <SellerProfile/>
          </div>
        );
    }
  }
}