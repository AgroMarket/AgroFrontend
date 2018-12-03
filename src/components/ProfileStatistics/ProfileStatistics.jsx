import './ProfileStatistics.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MyOrdersIcon from '@material-ui/icons/DateRange';
import {serverAddress} from 'constants/ServerAddress';

/**
 * Класс ProfileStatistics - компонент, отображающий статистику деятельности пользователя в системе FermaStore на странице личного кабинета
 */
export default class ProfileStatistics extends PureComponent {
  constructor(props) {
    super(props);
    
    // значения полей, используемых в render()
    this.state = {
      statistics: {},
      itemsLoaded: false,
    };
  }

  // Проверка свойств
  static propTypes = {
    jwtToken: PropTypes.string,
  };

  componentDidMount() {
    const {jwtToken} = this.props;
    fetch(`${serverAddress}/api/producer/dashboard`, {
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
                statistics: res.result.dashboard,
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
    const { error, statistics, itemsLoaded } = this.state;

    if (error) {
      return <p>Ошибка: {error.message}</p>;
    }
    else
    if (!itemsLoaded) {
      return <p className="load_info">Пожалуйста, подождите, идет загрузка страницы</p>;
    }
    else {
      if (statistics === undefined || statistics.length === 0) {
        return (
          <div className="load_info">
            <div/>
            <p>Нет данных.</p>
          </div>
        );
      }
      else
      return (
        <div className="seller_items">
          <div className="seller_items_header">
            <MyOrdersIcon className="my_orders_icon"/>
            <h2>Статистика производителя</h2>
          </div>
          <div>Товаров {statistics.products_count}</div>
          <div>Покупателей {statistics.consumers_count}</div>
          <div>Заказов {statistics.orders_count}</div>
          <div>Оборот {statistics.turnover}</div>
          <div>На счету {statistics.amount}</div>
        </div>
      );
    }
  }
}