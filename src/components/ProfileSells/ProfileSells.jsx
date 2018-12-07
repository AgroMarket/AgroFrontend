import './ProfileSells.scss';

import React, {Fragment, PureComponent} from 'react';
import MyOrdersIcon from '@material-ui/icons/DateRange';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import FirstPage from '@material-ui/icons/FirstPage';
import PrevPage from '@material-ui/icons/ChevronLeft';
import NextPage from '@material-ui/icons/ChevronRight';
import LastPage from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';

import OrderItem from 'components/OrderItem';
import {serverAddress} from 'constants/ServerAddress';

/**
 * Класс ProfileSells - компонент, отображающий заказы на странице продавца
 */
export default class ProfileSells extends PureComponent {
  constructor(props) {
    super(props);
    
    // значения полей, используемых в render()
    this.state = {
      // Заказы
      orders: {},
      itemsLoaded: false,
      // номер открытой вкладки
      value: 0,
      // текущая страница
      currentPage: 1,
      // последняя страница
      lastPage: 1,
      firstPageEnable: false,
      prevPageEnable: false,
      nextPageEnable: false,
      lastPageEnable: false,
    };
  }

  // Проверка свойств
  static propTypes = {
    // Функция отображения сведений о заказе
    itemHandle: PropTypes.func,
    jwtToken: PropTypes.string,
    getID: PropTypes.func,
  };

  componentDidMount() {
    const {jwtToken} = this.props;
    fetch(`${serverAddress}/api/producer/orders?scope=pending`, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
      },
    })
      .then(res => res.json())
      .then(res => {
          const lastPage = res.result.pagination.last_page;
          this.setState(
            prevState => {
              return {
                ...prevState,
                orders: res.result,
                itemsLoaded: true,
                lastPage: lastPage,
                nextPageEnable: lastPage > 1,
                lastPageEnable: lastPage > 1,
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

  showOrderInfo = id => {
    this.props.itemHandle('open_seller_order');
    this.props.getID(id);
  };

  handleChange = (event, value) => {
    const {jwtToken} = this.props;
    let scope;

    switch (value) {
      case 0:
        scope = 'pending';
        break;
      case 1:
        scope = 'close';
        break;
      case 2:
        scope = 'reject';
        break;
    }

    this.setState(
      prevState => {
        return {
          ...prevState,
          itemsLoaded: false,
          value: value,
        };
      }
    );

    fetch(`${serverAddress}/api/producer/orders?scope=${scope}`, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
      },
    })
      .then(res => res.json())
      .then(res => {
          const lastPage = res.result.pagination.last_page;
          this.setState(
            prevState => {
              return {
                ...prevState,
                orders: res.result,
                itemsLoaded: true,
                currentPage: 1,
                lastPage: lastPage,
                firstPageEnable: false,
                prevPageEnable: false,
                nextPageEnable: lastPage > 1,
                lastPageEnable: lastPage > 1,
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
  };

  changeList = page => {
    const { value } = this.state;
    const { jwtToken } = this.props;
    let scope;

    switch (value) {
      case 0:
        scope = 'pending';
        break;
      case 1:
        scope = 'close';
        break;
      case 2:
        scope = 'reject';
        break;
    }

    this.setState(
      prevState => {
        return {
          ...prevState,
          itemsLoaded: false,
        };
      }
    );
    fetch(`${serverAddress}/api/producer/orders?scope=${scope}&page=${page}`, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
      },
    })
      .then(res => res.json())
      .then(res => {
          const lastPage = res.result.pagination.last_page;
          this.setState(
            prevState => {
              return {
                ...prevState,
                currentPage: page,
                lastPage: lastPage,
                firstPageEnable: page > 1,
                prevPageEnable: page > 1,
                nextPageEnable: page < lastPage,
                lastPageEnable: page < lastPage,
                orders: res.result,
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
  };

  render() {
    const { error, orders, itemsLoaded, value, currentPage, lastPage, firstPageEnable, prevPageEnable, nextPageEnable, lastPageEnable } = this.state;
    let content = '',
      subcontent = '',
      scope = '',
      paginationButtons = '';

    if (lastPage > 1) {
      paginationButtons = (
        <div className="pagination">
          <IconButton
            disabled={!firstPageEnable}
            onClick={() => this.changeList(1)}
          >
            <FirstPage/>
          </IconButton>
          <IconButton
            disabled={!prevPageEnable}
            onClick={() => this.changeList(currentPage - 1)}
          >
            <PrevPage/>
          </IconButton>
          <span className="currentPage">
                  {currentPage}
                </span>
          <IconButton
            disabled={!nextPageEnable}
            onClick={() => this.changeList(currentPage + 1)}
          >
            <NextPage/>
          </IconButton>
          <IconButton
            disabled={!lastPageEnable}
            onClick={() => this.changeList(lastPage)}
          >
            <LastPage/>
          </IconButton>
        </div>
      );
    }
    if (error) {
      subcontent = <p className="load_info sell_orders_content">Ошибка: {error.message}</p>;
    }
    else
      if (!itemsLoaded) {
        subcontent = <p className="load_info sell_orders_content">Пожалуйста, подождите, идет загрузка страницы</p>;
      }
      else {
        if (orders === undefined || orders.length === 0 || orders.orders === undefined || orders.orders.length === 0) {
          switch (value) {
            case 0:
              scope = 'неотправленные';
              break;
            case 1:
              scope = 'отпраленные';
              break;
            case 2:
              scope = 'отмененные';
              break;
          }
          subcontent = <div className="load_info sell_orders_content">
            <div/>
            <p>У Вас отсутствуют {scope} заказы.</p>
          </div>;
        }
        else
          subcontent = <div className="sell_orders_content">
            {orders.orders.map((item, idx) => {
              return (
                <OrderItem item={item} key={idx} showOrderInfo={this.showOrderInfo}/>
              );
            })}
          </div>;
      }
    content = (
      <Fragment>
        <Tabs
          value={value}
          onChange={this.handleChange}
        >
          <Tab label="Заказы для отправки"/>
          <Tab label="Отправленные заказы"/>
          <Tab label="Отмененные заказы"/>
        </Tabs>
        {subcontent}
      </Fragment>
    );
    return (
      <div className="seller_items">
        <div className="seller_items_header">
          <MyOrdersIcon className="my_orders_icon"/>
          <h2>Заказы</h2>
        </div>
        {content}
        {paginationButtons}
      </div>
    );
  }
}