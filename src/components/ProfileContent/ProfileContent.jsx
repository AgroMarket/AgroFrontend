import './ProfileContent.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ProfileAccount from 'components/ProfileAccount';
import ProfileMoney from 'components/ProfileMoney';
import ProfileProfit from 'components/ProfileProfit';
import SellerItems from 'components/SellerItems';
import NewProduct from 'components/NewProduct';
import ProfileContragent from 'components/ProfileContragent';
import ProfileSells from 'components/ProfileSells';
import UserProfile from 'components/UserProfile';
import ProfileClients from 'components/ProfileClients';
import SellerOrder from 'components/SellerOrder';
import ProfileEdit from 'components/ProfileEdit';
import ProfilePurchase from 'components/ProfilePurchase';
import BuyerOrder from 'components/BuyerOrder';
import ProfileSellers from 'components/ProfileSellers';
import ProfileStatistics from 'components/ProfileStatistics';
import {serverAddress} from 'constants/ServerAddress';

/**
 * Класс ProfileContent - компонент, отображающий данные для выбранного пункта меню на странице продавца
 */
export default class ProfileContent extends PureComponent {
  constructor(props) {
    super(props);

    // значения полей, используемых в render()
    this.state = {
      // id редактируемого или отображаемого элемента
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
    userStatus: PropTypes.string,
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

  newItemCreated = (itemID, item, newItem) => {
    const { id } = this.state;
    const { jwtToken, itemHandle } = this.props;
    const itemJSON = JSON.stringify({
      'product': item,
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
        () => {
          itemHandle(itemID);
          this.getID(-1);
        }
      );
  };

  render() {
    const { id } = this.state;
    const { openedSection, itemHandle, jwtToken, userStatus } = this.props;

    switch (openedSection) {
      case 'profile_account':
        return (
          <div className="seller_content">
            <ProfileAccount
              itemHandle={itemHandle}
              jwtToken={jwtToken}
              userStatus={userStatus}
            />
          </div>
        );
      case 'add_money_to_account':
        return (
          <div className="seller_content">
            <ProfileMoney
              itemHandle={itemHandle}
            />
          </div>
        );
      case 'get_money_from_account':
        return (
          <div className="seller_content">
            <ProfileProfit
              itemHandle={itemHandle}
            />
          </div>
        );
      case 'profile_purchase':
        return (
          <div className="seller_content">
            <ProfilePurchase
              itemHandle={itemHandle}
              getID={this.getID}
              jwtToken={jwtToken}
            />
          </div>
        );
      case 'open_buyer_order':
        return (
          <div className="seller_content">
            <BuyerOrder
              id={id}
            />
          </div>
        );
      case 'profile_sellers':
        return (
          <div className="seller_content">
            <ProfileSellers
              itemHandle={itemHandle}
              getID={this.getID}
              jwtToken={jwtToken}
            />
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
            <NewProduct newItemCreated={this.newItemCreated} newItem={true}/>
          </div>
        );
      case 'edit_product':
        return (
          <div className="seller_content">
            <NewProduct newItemCreated={this.newItemCreated} newItem={false} id={id}/>
          </div>
        );
      case 'seller_sells':
        return (
          <div className="seller_content">
            <ProfileSells itemHandle={itemHandle} jwtToken={jwtToken} getID={this.getID}/>
          </div>
        );
      case 'open_seller_order':
        return (
          <div className="seller_content">
            <SellerOrder id={id}/>
          </div>
        );
      case 'seller_clients':
        return (
          <div className="seller_content">
            <ProfileClients
              itemHandle={itemHandle}
              jwtToken={jwtToken}
              getID={this.getID}
            />
          </div>
        );
      case 'contragent_profile':
        return (
          <div className="seller_content">
            <ProfileContragent
              id={id}
              getID={this.getID}
            />
          </div>
        );
      case 'profile_statistics':
        return (
          <div className="seller_content">
            <ProfileStatistics/>
          </div>
        );
      case 'user_profile':
        return (
          <div className="seller_content">
            <UserProfile
              itemHandle={itemHandle}
              jwtToken={jwtToken}
              userStatus={userStatus}
            />
          </div>
        );
      case 'edit_profile':
        return (
          <div className="seller_content">
            <ProfileEdit
              itemHandle={itemHandle}
              jwtToken={jwtToken}
              userStatus={userStatus}
            />
          </div>
        );
    }
  }
}