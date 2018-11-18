import './SellerClients.scss';

import React, { PureComponent } from 'react';
import MyOrdersIcon from '@material-ui/icons/DateRange';

import SellerClient from 'components/SellerClient';

// TODO заменить заглушку с товарами на данные с сервера
const consumersJSON = {
  'status': 200,
  'message': 'Список покупателей',
  'result': {
    'consumers': [
      {
        'consumer': {
          'id': 1,
          'name': 'Матиас Егор Викторович',
          'email': 'roscoe@example.org',
          'phone': '433-488-0671',
          'address': 'Сочи',
          'image': '/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--45d794c788ec0050b03b4ac1364b50a7d460c5a0/missing.png',
          'link': '/api/consumers/1',
        },
      },
      {
        'consumer': {
          'id': 2,
          'name': 'Семенов Иван Петрович',
          'email': 'wersd@dretert.ru',
          'phone': '523-643-6546',
          'address': 'Великий Новгород',
          'image': '/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--45d794c788ec0050b03b4ac1364b50a7d460c5a0/missing.png',
          'link': '/api/consumers/2',
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
 * Класс SellerClients - компонент, отображающий клиентов на странице продавца
 */
export default class SellerClients extends PureComponent {
  constructor(props) {
    super(props);
    
    // значения полей, используемых в render()
    this.state = {
      // Клиенты
      clients: consumersJSON.result,
    };
  }
  
  render() {
    const { clients } = this.state;
    return (
      <div className="seller_items">
        <div className="seller_items_header">
          <MyOrdersIcon className="my_orders_icon"/>
          <h2>Мои покупатели</h2>
        </div>
        {clients.consumers.map( (item, idx) => {
          return (
            <SellerClient item={item} key={idx}/>
          );
        })}
      </div>
    );
  }
}