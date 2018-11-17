import './SellerItems.scss';

import React, { PureComponent } from 'react';
import MyOrdersIcon from '@material-ui/icons/DateRange';
import Button from '@material-ui/core/Button/Button';

import SellerItem from 'components/SellerItem';

// Данные для кнопки Добавить объявление
const newSellButton = {
  id: 'sell_item',
  name: 'Продать товар',
};

// TODO заменить заглушку с товарами на данные с сервера
const sellerItemsJSON = {
    'status': 200,
    'message': 'Список товаров производителя',
    'result': {
      'products': [
        {
          'product': {
            'link': '/api/products/37',
            'id': 37,
            'title': 'Зелень №1',
            'measures': 'кг',
            'price': 749,
            'category_id': 6,
            'producer_id': 7,
            'rank': 1,
            'image': '/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBSdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c88da4efa63c90cbaf083893e4ac242829a54ae0/missing.png',
          },
        },
        {
          'product': {
            'link': '/api/products/61',
            'id': 61,
            'title': 'Фрукты №1',
            'measures': 'кг',
            'price': 983,
            'category_id': 8,
            'producer_id': 7,
            'rank': 1,
            'image': '/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBYdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c720b229e912ef865ca799b088da52e8b0d9c6e9/missing.png',
          },
        },
        {
          'product': {
            'link': '/api/products/49',
            'id': 49,
            'title': 'Овощи №1',
            'measures': 'кг',
            'price': 947,
            'category_id': 7,
            'producer_id': 7,
            'rank': 1,
            'image': '/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBVdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--95eaa450f44fd0b2304b4ef3cab1961e705933d2/missing.png',
          },
        },
        {
          'product': {
            'link': '/api/products/38',
            'id': 38,
            'title': 'Зелень №2',
            'measures': 'кг',
            'price': 580,
            'category_id': 6,
            'producer_id': 7,
            'rank': 2,
            'image': '/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBTQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a38c9050f636a1a4173741d3b2d7cc76db66bae6/missing.png',
          },
        },
        {
          'product': {
            'link': '/api/products/62',
            'id': 62,
            'title': 'Фрукты №2',
            'measures': 'кг',
            'price': 555,
            'category_id': 8,
            'producer_id': 7,
            'rank': 2,
            'image': '/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBZQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ed6bf3ff2288834241558cf5d1fc60b7f2554c24/missing.png',
          },
        },
        {
          'product': {
            'link': '/api/products/50',
            'id': 50,
            'title': 'Овощи №2',
            'measures': 'кг',
            'price': 334,
            'category_id': 7,
            'producer_id': 7,
            'rank': 2,
            'image': '/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBWQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--bc9c7e09d0ebfd5f48edd017e31bf1f61794e742/missing.png',
          },
        },
      ],
      'pagination': {
        'current_page': 1,
        'first_page': 1,
        'last_page': 6,
        'prev_page_url': null,
        'next_page_url': '/api/producer/products?&page=2',
      },
    },
    'error': null,
  };

/**
 * Класс SellerItems - компонент, отображающий список продаваемых товаров на странице продавца
 */
export default class SellerItems extends PureComponent {
  constructor(props) {
    super(props);
    
    // значения полей, используемых в render()
    this.state = {
      sellerItems: sellerItemsJSON.result,
    };
  }
  
  render() {
    const { sellerItems } = this.state;
    return (
      <div className="seller_items">
        <div className="seller_items_header">
          <MyOrdersIcon className="my_orders_icon"/>
          <h2>Товары, выставленные на продажу</h2>
        </div>
        <p>
          <Button
            className="sell_button"
            variant="contained"
            color="primary"
            id={newSellButton.id}
          >
            {newSellButton.name}
          </Button>
        </p>
        {sellerItems.products.map( (item, idx) => {
          return (
            <SellerItem item={item} key={idx}/>
          );
        })}
      </div>
    );
  }
}