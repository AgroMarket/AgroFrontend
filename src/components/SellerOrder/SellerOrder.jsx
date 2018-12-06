import './SellerOrder.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MyOrdersIcon from '@material-ui/icons/DateRange';
import moment from 'moment';

import {serverAddress} from 'constants/ServerAddress';
import Button from '@material-ui/core/Button/Button';
import OrderStatus from 'components/OrderStatus';

// Данные для кнопки Передать заказ на доставку
const orderDoneButton = {
  id: 'order_done',
  name: 'Передать заказ на доставку',
};
// Данные для кнопки Отменить заказ
const orderCancelButton = {
  id: 'order_cancel',
  name: 'Отменить заказ',
};

/**
 * Класс SellerOrder - компонент, отображающий подробные сведения о заказе на странице продавца
 */
export default class SellerOrder extends PureComponent {
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

  componentDidMount() {
    const { id, jwtToken } = this.props;
    fetch(`${serverAddress}/api/producer/orders/${id}`, {
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
                order: res.result.order,
                itemsLoaded: true,
                orderStatus: res.result.order.status,
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

  orderDone = () => {
    const statusJSON = JSON.stringify({
      'order': {
        'status': 1,
      },
    });
    const { id, jwtToken } = this.props;

    this.setState(
      prevState => {
        return {
          ...prevState,
          orderStatus: 'Обработка данных',
        };
      }
    );

    fetch(`${serverAddress}/api/producer/orders/${id}`, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
      },
      body: statusJSON,
    })
      .then(res => res.json())
      .then(res => {
          this.setState(
            prevState => {
              return {
                ...prevState,
                orderStatus: res.result.order.status,
              };
            }
          );
        },
        error => {
          this.setState({
            error,
          });
        });
  };

  render() {
    const { error, order, itemsLoaded, orderStatus } = this.state;
    const rub = ' руб.';
    moment.locale('ru');

    if (error) {
      return <p>Ошибка: {error.message}</p>;
    }
    else if (!itemsLoaded) {
      return <p className="load_info">Пожалуйста, подождите, идет загрузка страницы</p>;
    }
    else {
      let needAcceptOrder = '';
      if (orderStatus === 'Подтверждается')
      {
        needAcceptOrder = <p>
          <Button
            className="orderDone"
            variant="contained"
            color="primary"
            id={orderDoneButton.id}
            onClick={() => this.orderDone()}
          >
            {orderDoneButton.name}
          </Button>
        </p>;
      }
      return (
        <div className="seller_items order_info">
          <div className="seller_items_header">
            <MyOrdersIcon className="my_orders_icon"/>
            <h2>Заказ № {order.id} от {moment(order.date).format('LL')}</h2>
          </div>
          <OrderStatus orderStatus={orderStatus}/>
          {needAcceptOrder}
          <p>
            <Button
              className="orderCancel"
              variant="contained"
              color="primary"
              id={orderCancelButton.id}
            >
              {orderCancelButton.name}
            </Button>
          </p>
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
          {order.order_items.map((product, index) => {
              return (
                <div className="product seller_item" key={index}>
                  <div>
                    <span>{product.product_name}</span>
                  </div>
                  <div>
                    <span>{product.product_quantity}</span>
                  </div>
                  <div>
                    <span>{product.product_price.toLocaleString('ru') + rub}</span>
                  </div>
                  <div>
                    <span>{product.product_sum.toLocaleString('ru') + rub}</span>
                  </div>
                </div>
              );
            }
          )}
          <span className="seller_item">Общая сумма заказа: {order.total.toLocaleString('ru') + rub}</span>
        </div>
      );
    }
  }
}