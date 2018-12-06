import './BuyerOrder.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MyOrdersIcon from '@material-ui/icons/DateRange';
import moment from 'moment';

import {serverAddress} from 'constants/ServerAddress';

/**
 * Класс BuyerOrder - компонент, отображающий подробные сведения о заказе на странице покупателя
 */
export default class BuyerOrder extends PureComponent {
  constructor(props) {
    super(props);

    // значения полей, используемых в render()
    this.state = {
      order: {},
      itemsLoaded: false,
    };
  }

  // Проверка свойств
  static propTypes = {
    id: PropTypes.number,
  };

  componentDidMount() {
    const { id } = this.props;
    fetch(`${serverAddress}/api/consumer/asks/${id}`)
      .then(res => res.json())
      .then(res => {
          this.setState(
            prevState => {
              return {
                ...prevState,
                order: res.result.ask,
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
    const {error, order, itemsLoaded} = this.state;
    const rub = ' руб.';
    moment.locale('ru');

    if (error) {
      return <p>Ошибка: {error.message}</p>;
    }
    else if (!itemsLoaded) {
      return <p className="load_info">Пожалуйста, подождите, идет загрузка страницы</p>;
    }
    else {
      // TODO рефакторинг доделать
      return (
        <div className="seller_items order_info">
          <div className="seller_items_header">
            <MyOrdersIcon className="my_orders_icon"/>
            <h2>Заказ № {order.id} от {moment(order.date).format('LL')}</h2>
          </div>
          <div className="product seller_item">
            <div>
              <span>Название продукта</span>
            </div>
            <div>
              <span>Количество</span>
            </div>
            <div>
              <span>Цена</span>
            </div>
            <div>
              <span>Сумма</span>
            </div>
          </div>
          {order.orders.map((items, index) => {
            return(
              <div key={index}>
                <span className="seller_status">{index+1}. Статус заказа по продавцу {items.order.producer_name} : {items.order.status}</span>
                {items.order.order_items.map((item, idx) => {
                  return (
                    <div className="product seller_item" key={idx}>
                      <div>
                        <span>{item.product_name}</span>
                      </div>
                      <div>
                        <span>{item.quantity}</span>
                      </div>
                      <div>
                        <span>{item.product_price.toLocaleString('ru') + rub}</span>
                      </div>
                      <div>
                        <span>{item.sum.toLocaleString('ru') + rub}</span>
                      </div>
                    </div>
                  );
                })}
                <span className="seller_item">Общая сумма заказа по продавцу: {items.order.total.toLocaleString('ru') + rub}</span>
              </div>
            );
          })}
          <span className="seller_item">Общая стоимость доставки заказа: {order.delivery_cost.toLocaleString('ru') + rub}</span>
          <span className="seller_item">Общая сумма заказа по всем продавцам: {order.amount.toLocaleString('ru') + rub}</span>
        </div>
      );
    }
  }
}