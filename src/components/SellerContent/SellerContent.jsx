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
    if (openedSection === 'seller_items') {
      return (
        <div className="seller_content">
          <SellerItems itemHadle={itemHandle}/>
        </div>
      );
    }
    else
      if (openedSection === 'seller_sells')
      return (
        <div className="seller_content">
          <SellerSells/>
        </div>
      );
      else
      if (openedSection === 'seller_clients')
        return (
          <div className="seller_content">
            <SellerClients/>
          </div>
        );
      else
      if (openedSection === 'seller_profile')
        return (
          <div className="seller_content">
            <SellerProfile/>
          </div>
        );
  }
}