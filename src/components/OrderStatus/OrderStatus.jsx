import './OrderStatus.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * Класс OrderStatus - компонент, отображающий статус заказа
 */
export default class OrderStatus extends PureComponent {
  // Проверка свойств
  static propTypes = {
    orderStatus: PropTypes.string,
  };
  
  render() {
    const {orderStatus} = this.props;
    return (
      <p className="order_status">
        Статус исполнения заказа: {orderStatus}
      </p>
    );
  }
}