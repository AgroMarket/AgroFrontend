import './ProfileDelivery.scss';

import React, { PureComponent } from 'react';
import MyOrdersIcon from '@material-ui/icons/DateRange';
import PropTypes from 'prop-types';

import DeliveryItem from 'components/DeliveryItem';
import {serverAddress} from 'constants/ServerAddress';

/**
 * Класс ProfileDelivery - компонент, отображающий список заказов на доставку
 */
export default class ProfileDelivery extends PureComponent {
  constructor(props) {
    super(props);
    
    // значения полей, используемых в render()
    this.state = {
      // Заказы
      orders: {},
      itemsLoaded: false,
    };
  }

  // Проверка свойств
  static propTypes = {
    // Функция отображения сведений о заказе
    itemHandle: PropTypes.func,
    jwtToken: PropTypes.string,
    getID: PropTypes.func,
  };

  componentDidMount() {
    const {jwtToken} = this.props;
    fetch(`${serverAddress}/api/users/tasks`, {
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
                orders: res.result,
                itemsLoaded: true,
              };
            }
          );
        },
        error => {
          this.setState({
            itemsLoaded: true,
            error,
          });
        });
  }

  showOrderInfo = id => {
    this.props.itemHandle('open_delivery_order');
    this.props.getID(id);
  };

  render() {
    const { error, orders, itemsLoaded } = this.state;

    if (error) {
      return <p>Ошибка: {error.message}</p>;
    }
    else
    if (!itemsLoaded) {
      return <p className="load_info">Пожалуйста, подождите, идет загрузка страницы</p>;
    }
    else {
      let content;
      if (orders === undefined || orders.length === 0 || orders.tasks === undefined || orders.tasks.length === 0) {
        content = <div className="load_info">
          <div/>
          <p>Вы еще не получили заказ на доставку товара.</p>
        </div>;
      }
      else
        content = (orders.tasks.map((item, idx) => {
          return (
            <DeliveryItem item={item} key={idx} showOrderInfo={this.showOrderInfo}/>
          );
        }));
      return (
        <div className="seller_items">
          <div className="seller_items_header">
            <MyOrdersIcon className="my_orders_icon"/>
            <h2>Заказы</h2>
          </div>
          {content}
        </div>
      );
    }
  }
}