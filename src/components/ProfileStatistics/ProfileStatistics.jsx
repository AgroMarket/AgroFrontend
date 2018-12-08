import './ProfileStatistics.scss';
// TODO сделать рефакторинг
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
    fetch(`${serverAddress}/api/member/dashboard`, {
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
            <h2>Статистика</h2>
          </div>
          <div className="statistics">
            <div className="statistics_item">
              <span className="statistics_text">Товары на продаже</span>
              <span className="statistics_counts">{statistics.products_count}</span>
            </div>
            <div className="statistics_item">
              <span className="statistics_text">Уникальные покупатели</span>
              <span className="statistics_counts">{statistics.consumers_count}</span>
            </div>
            <div className="statistics_item">
              <span className="statistics_text">Приняты заказы</span>
              <span className="statistics_counts">{statistics.sells_count}</span>
            </div>
            <div className="statistics_item">
              <span className="statistics_text">Стоимость продаж</span>
              <span className="statistics_counts">{statistics.sells_sum.toLocaleString('ru')}</span>
            </div>
            <div className="statistics_item">
              <span className="statistics_text">Сумма на счете</span>
              <span className="statistics_counts">{statistics.amount.toLocaleString('ru')}</span>
            </div>
            <div className="statistics_item">
              <span className="statistics_text">Уникальные поставщики</span>
              <span className="statistics_counts">{statistics.producers_count}</span>
            </div>
            <div className="statistics_item">
              <span className="statistics_text">Совершено покупок</span>
              <span className="statistics_counts">{statistics.buys_count}</span>
            </div>
            <div className="statistics_item">
              <span className="statistics_text">Стоимость покупок</span>
              <span className="statistics_counts">{statistics.buys_sum.toLocaleString('ru')}</span>
            </div>
          </div>
        </div>
      );
    }
  }
}