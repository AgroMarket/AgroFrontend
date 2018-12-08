import './DeliveryOrder.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import MyOrdersIcon from '@material-ui/icons/DateRange';
import Button from '@material-ui/core/Button/Button';
import moment from 'moment';

import OrderStatus from 'components/OrderStatus/OrderStatus';
import {serverAddress} from 'constants/ServerAddress';

// Данные для кнопки Заказ доставлен
const orderDoneButton = {
  id: 'order_finish',
  name: 'Заказ доставлен',
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

  componentDidMount() {
    const { id, jwtToken } = this.props;
    fetch(`${serverAddress}/api/carrier/tasks/${id}`, {
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
                order: res.result.task,
                itemsLoaded: true,
                orderStatus: res.result.task.status,
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
      'task': {
        'status': 'Доставлен',
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

    fetch(`${serverAddress}/api/carrier/tasks/${id}`, {
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
                orderStatus: res.result.task.status,
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
      let orderDone = '';
      if (orderStatus !== 'Доставлен')
      {
        orderDone = <p>
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
            <h2>Заказ № {order.id} от {moment(order.created_at).format('LL')}</h2>
          </div>
          <OrderStatus orderStatus={orderStatus}/>
          {orderDone}
          <div className="product seller_item">
            <div>
              <span>Получатель</span>
            </div>
            <div>
              <span>Стоимость доставки</span>
            </div>
          </div>
          <div className="product seller_item">
            <div>
              <span>{order.consumer}</span>
            </div>
            <div>
              <span>{order.delivery_cost.toLocaleString('ru') + rub}</span>
            </div>
          </div>
        </div>
      );
    }
  }
}