import './ProfileContent.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import SellerItems from 'components/SellerItems';
import NewProduct from 'components/NewProduct';
import SellerSells from 'components/SellerSells';
import SellerProfile from 'components/SellerProfile';
import SellerClients from 'components/SellerClients';
import SellerOrder from 'components/SellerOrder/SellerOrder';
import ClientProfile from 'components/ClientProfile/ClientProfile';
import EditProfile from 'components/EditProfile/EditProfile';

/**
 * Класс ProfileContent - компонент, отображающий данные для выбранного пункта меню на странице продавца
 */
export default class ProfileContent extends PureComponent {
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
            <SellerItems itemHandle={itemHandle}/>
          </div>
        );
      case 'new_product':
        return (
          <div className="seller_content">
            <NewProduct/>
          </div>
        );
      case 'seller_sells':
        return (
          <div className="seller_content">
            <SellerSells itemHandle={itemHandle}/>
          </div>
        );
      case 'open_order':
        return (
          <div className="seller_content">
            <SellerOrder/>
          </div>
        );
      case 'seller_clients':
        return (
          <div className="seller_content">
            <SellerClients itemHandle={itemHandle}/>
          </div>
        );
      case 'client_profile':
        return (
          <div className="seller_content">
            <ClientProfile/>
          </div>
        );
      case 'seller_profile':
        return (
          <div className="seller_content">
            <SellerProfile itemHandle={itemHandle}/>
          </div>
        );
      case 'edit_profile':
        return (
          <div className="seller_content">
            <EditProfile/>
          </div>
        );
    }
  }
}