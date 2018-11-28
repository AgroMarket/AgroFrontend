import './ProfileSells.scss';

import React, { PureComponent } from 'react';
import MyOrdersIcon from '@material-ui/icons/DateRange';
import PropTypes from 'prop-types';

import OrderItem from 'components/OrderItem';
import {serverAddress} from 'constants/ServerAddress';

/**
 * Класс ProfileSells - компонент, отображающий заказы на странице продавца
 */
export default class ProfileSells extends PureComponent {
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
    fetch(`${serverAddress}/api/producer/orders`, {
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

  showOrderInfo = (itemID, id) => {
    this.props.itemHandle(itemID);
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
      if (orders === undefined || orders.length === 0 || orders.orders === undefined || orders.orders.length === 0) {
        content = <div className="load_info">
          <div/>
          <p>Вы еще не продали товар.</p>
        </div>;
      }
      else
        content = (orders.orders.map((item, idx) => {
            return (
              <OrderItem item={item} key={idx} itemHandle={() => this.showOrderInfo('open_order', item.order.id)}/>
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