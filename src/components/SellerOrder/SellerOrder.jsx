import './SellerOrder.scss';

import React, { PureComponent } from 'react';

const responseOrder = {
  "status": 200,
  "message": "Данные о покупке",
  "result": {
      "order": {
          "id": 2,
          "producer_id": 7,
          "producer_link": "/api/producers/7",
          "name": "Список товаров",
          "link": "/api/producer/orders/2",
          "date": "2018-11-23T04:02:25.999Z",
          "status": "Выполнен",
          "total": 2116,
          "products": [
              {
                  "order_item_id": 4,
                  "product_id": 37,
                  "product_link": "/api/products/37",
                  "product_name": "Зелень №1",
                  "product_price": 136,
                  "product_quantity": 2,
                  "product_sum": 272,
                  "product_image": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBTQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a38c9050f636a1a4173741d3b2d7cc76db66bae6/missing.png"
              },
              {
                  "order_item_id": 5,
                  "product_id": 38,
                  "product_link": "/api/products/38",
                  "product_name": "Зелень №2",
                  "product_price": 778,
                  "product_quantity": 2,
                  "product_sum": 1556,
                  "product_image": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBTUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--bb4f91306f75b47ad78c94fa8a9215cbf0833e35/missing.png"
              },
              {
                  "order_item_id": 6,
                  "product_id": 39,
                  "product_link": "/api/products/39",
                  "product_name": "Зелень №3",
                  "product_price": 144,
                  "product_quantity": 2,
                  "product_sum": 288,
                  "product_image": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBTZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ef1357da0c46c439e7bab20fb9645e1409662d3f/missing.png"
              }
          ]
      }
  },
  "error": null
}
/**
 * Класс SellerOrder - компонент, отображающий подробные сведения о заказе на странице продавца
 */
export default class SellerOrder extends PureComponent {
  constructor(props) {
    super(props);
    
    // значения полей, используемых в render()
    this.state = {
      products: responseOrder.result.order.products,
      producer_id: responseOrder.result.order.producer_id,
      date: responseOrder.result.order.date,
      total: responseOrder.result.order.total,
    };
  }
  
  render() {
    //let response = JSON.stringify(responseOrder);
    //let products = responseOrder.result.order.products;
    return (
      <div className='container'>
          <div>
            <span>{this.state.producer_id}</span>
          </div>
          <div>
            {this.state.products.map((product, index) =>
            {
              return(
              <div className={`${product}-${product.id}`}>
                <span key={product.id}>{product.product_name}</span>
              </div>
              )
            }

            )}
           
          </div>
      </div>
    );
  }
}