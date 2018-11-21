import './SellerSells.scss';

import React, { PureComponent } from 'react';
import MyOrdersIcon from '@material-ui/icons/DateRange';
import OrderItem from 'components/OrderItem';
import PropTypes from 'prop-types';

import {serverAddress} from 'constants/ServerAddress';

/**
 * Класс SellerSells - компонент, отображающий заказы на странице продавца
 */
export default class SellerSells extends PureComponent {
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

  render() {
    const { error, orders, itemsLoaded } = this.state;
    const { itemHandle } = this.props;

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
          <p>К сожалению Вы еще не получили заказ.</p>
        </div>;
      }
      else
        content = (orders.orders.map((item, idx) => {
            return (
              <OrderItem item={item} key={idx} itemHandle={itemHandle}/>
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