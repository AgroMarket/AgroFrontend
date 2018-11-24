import './ProfileContent.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import SellerItems from 'components/SellerItems';
import NewProduct from 'components/NewProduct';
import SellerSells from 'components/SellerSells';
import UserProfile from 'components/UserProfile';
import SellerClients from 'components/SellerClients';
import SellerOrder from 'components/SellerOrder';
import EditProfile from 'components/EditProfile';
import ProfilePurchase from 'components/ProfilePurchase';
import ProfileSellers from 'components/ProfileSellers/ProfileSellers';
import {serverAddress} from 'constants/ServerAddress';

/**
 * Класс ProfileContent - компонент, отображающий данные для выбранного пункта меню на странице продавца
 */
export default class ProfileContent extends PureComponent {
  constructor(props) {
    super(props);

    // значения полей, используемых в render()
    this.state = {
      // id редактируемого товара
      id: -1,
    };
  }

  // Проверка свойств
  static propTypes = {
    // Функция отображения формы продажи товара
    itemHandle: PropTypes.func,
    // открытый пункт меню
    openedSection: PropTypes.string,
    jwtToken: PropTypes.string,
    newItemCreated: PropTypes.func,
    seller: PropTypes.bool,
  };

  newItemCreated = (itemID, item, newItem) => {
    const { id } = this.state;
    const { jwtToken, itemHandle } = this.props;
    const itemJSON = JSON.stringify({
      'product':
        {
          'name': item.name,
          'description': item.description,
          'measures': item.measures,
          'price': item.price,
          'category_id': item.category,
        },
    });
    let request, method;
    if (newItem === 'true') {
      request = `${serverAddress}/api/producer/products`;
      method = 'post';
    }
    else {
      request = `${serverAddress}/api/producer/products/${id}`;
      method = 'put';
    }
    fetch(request, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
      },
      body: itemJSON,
    })
      .then(
        () => itemHandle(itemID)
      );
  };

  getID = id => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          id: id,
        };
      }
    );
  };

  render() {
    const { id } = this.state;
    const { openedSection, itemHandle, jwtToken, seller } = this.props;

    switch (openedSection) {
      case 'profile_purchase':
        return (
          <div className="seller_content">
            <ProfilePurchase itemHandle={itemHandle}/>
          </div>
        );
      case 'profile_sellers':
        return (
          <div className="seller_content">
            <ProfileSellers itemHandle={itemHandle}/>
          </div>
        );
      case 'seller_items':
        return (
          <div className="seller_content">
            <SellerItems
              itemHandle={itemHandle}
              getID={this.getID}
              jwtToken={jwtToken}
            />
          </div>
        );
      case 'new_product':
        return (
          <div className="seller_content">
            <NewProduct newItemCreated={this.newItemCreated} newItem="true"/>
          </div>
        );
      case 'edit_product':
        return (
          <div className="seller_content">
            <NewProduct newItemCreated={this.newItemCreated} newItem="false" id={id}/>
          </div>
        );
      case 'seller_sells':
        return (
          <div className="seller_content">
            <SellerSells itemHandle={itemHandle} jwtToken={jwtToken}/>
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
            <SellerClients itemHandle={itemHandle} jwtToken={jwtToken}/>
          </div>
        );
      case 'user_profile':
        return (
          <div className="seller_content">
            <UserProfile
              itemHandle={itemHandle}
              jwtToken={jwtToken}
              seller={seller}
            />
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