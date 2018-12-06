import './DeliveryOrder.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MyOrdersIcon from '@material-ui/icons/DateRange';
import moment from 'moment';

import {serverAddress} from 'constants/ServerAddress';
import Button from '@material-ui/core/Button/Button';
import OrderStatus from 'components/OrderStatus/OrderStatus';

// Данные для кнопки Принять заказ на доставку
const orderStartButton = {
  id: 'order_start',
  name: 'Принять заказ на доставку',
};
// Данные для кнопки Заказ доставлен
const orderDoneButton = {
  id: 'order_finish',
  name: 'Заказ доставлен',
};
// Данные для кнопки Отменить заказ
const orderCancelButton = {
  id: 'order_cancelling',
  name: 'Отменить заказ',
};

/**
 * Класс DeliveryOrder - компонент, отображающий подробные сведения о заказе на доставку
 */
export default class DeliveryOrder extends PureComponent {
  constructor(props) {
    super(props);
    
    // значения полей, используемых в render()
    this.state = {
      order: {},
      itemsLoaded: false,
      orderStatus: '',
    };
  }

  // Проверка свойств
  static propTypes = {
    id: PropTypes.number,
    jwtToken: PropTypes.string,
  };

  // TODO сделать по аналогии с SellerOrder со строки 44 ComponentDidMount и до конца
  render() {
    return (
      <p>DeliveryOrder</p>
    );
  }
}