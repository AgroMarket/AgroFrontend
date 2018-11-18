import './SellerSells.scss';

import React, { PureComponent } from 'react';
import MyOrdersIcon from '@material-ui/icons/DateRange';
import OrderItem from 'components/OrderItem';

// TODO заменить заглушку с товарами на данные с сервера
const ordersJSON = {
  'status': 200,
  'message': 'Продажи производителя',
  'result': {
    'orders': [
      {
        'order': {
          'id': 2,
          'date': '2018-11-17T11:14:48.760Z',
          'status': 'Выполнен',
          'link': '/api/producer/orders/2',
          'total': 4356,
        },
      },
      {
        'order': {
          'id': 2,
          'date': '2018-11-16T10:24:48.760Z',
          'status': 'Выполнен',
          'link': '/api/producer/orders/3',
          'total': 5645,
        },
      },
    ],
    'pagination': {
      'current_page': 1,
      'first_page': 1,
      'last_page': 0,
      'prev_page_url': null,
      'next_page_url': null,
    },
  },
  'error': null,
};

/**
 * Класс SellerSells - компонент, отображающий заказы на странице продавца
 */
export default class SellerSells extends PureComponent {
  constructor(props) {
    super(props);
    
    // значения полей, используемых в render()
    this.state = {
      // Заказы
      orders: ordersJSON.result,
    };
  }
  
  render() {
    const { orders } = this.state;
    return (
      <div className="seller_items">
        <div className="seller_items_header">
          <MyOrdersIcon className="my_orders_icon"/>
          <h2>Заказы</h2>
        </div>
        {orders.orders.map( (item, idx) => {
          return (
            <OrderItem item={item} key={idx}/>
          );
        })}
      </div>
    );
  }
}