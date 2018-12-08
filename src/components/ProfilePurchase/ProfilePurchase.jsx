import './ProfilePurchase.scss';

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

import BuyerItem from 'components/BuyerItem';
import {serverAddress} from 'constants/ServerAddress';

/**
 * Класс ProfilePurchase - компонент, отображающий Покупки на странице личного кабинета
 */
export default class ProfilePurchase extends PureComponent {
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
    fetch(`${serverAddress}/api/member/asks?scope=pending`, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        let lastPage;
        if (res.result.pagination !== null)
          lastPage = res.result.pagination.last_page;
        else
          lastPage = 1;
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
    this.props.itemHandle('open_buyer_order');
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
        scope = 'confirmed';
        break;
      case 2:
        scope = 'completed';
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

    fetch(`${serverAddress}/api/member/asks?scope=${scope}`, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
      },
    })
      .then(res => res.json())
      .then(res => {
          let lastPage;
          if (res.result.pagination !== null)
            lastPage = res.result.pagination.last_page;
          else
            lastPage = 1;
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
        scope = 'confirmed';
        break;
      case 2:
        scope = 'completed';
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
    fetch(`${serverAddress}/api/member/asks?scope=${scope}&page=${page}`, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
      },
    })
      .then(res => res.json())
      .then(res => {
          let lastPage;
          if (res.result.pagination !== null)
            lastPage = res.result.pagination.last_page;
          else
            lastPage = 1;
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
    let subcontent = '',
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
      subcontent = <p>Ошибка: {error.message}</p>;
    }
    else
    if (!itemsLoaded) {
      subcontent = <p className="load_info">Пожалуйста, подождите, идет загрузка страницы</p>;
    }
    else {
      if (orders === undefined || orders.length === 0 || orders.asks === undefined || orders.asks.length === 0) {
        switch (value) {
          case 0:
            scope = 'новые';
            break;
          case 1:
            scope = 'доставляемые';
            break;
          case 2:
            scope = 'полученные';
            break;
        }
        subcontent = <div className="load_info sell_orders_content">
          <div/>
          <p>У Вас отсутствуют {scope} покупки.</p>
        </div>;
      }
      else
        subcontent = (
          <div className="sell_orders_content">
            {orders.asks.map((item, idx) => {
              return (
                <BuyerItem item={item} key={idx} showOrderInfo={this.showOrderInfo}/>
              );
            })}
          </div>
        );
    }
    const content = (
      <Fragment>
        <Tabs
          value={value}
          onChange={this.handleChange}
        >
          <Tab label="Новые покупки"/>
          <Tab label="Доставляемые покупки"/>
          <Tab label="Полученные покупки"/>
        </Tabs>
        {subcontent}
      </Fragment>
    );
    return (
      <div className="seller_items">
        <div className="seller_items_header">
          <MyOrdersIcon className="my_orders_icon"/>
          <h2>Покупки</h2>
        </div>
        {content}
        {paginationButtons}
      </div>
    );
  }
}