import './ProfileSellers.scss';

import React, { PureComponent } from 'react';
import MyOrdersIcon from '@material-ui/icons/DateRange';
import IconButton from '@material-ui/core/IconButton';
import FirstPage from '@material-ui/icons/FirstPage';
import PrevPage from '@material-ui/icons/ChevronLeft';
import NextPage from '@material-ui/icons/ChevronRight';
import LastPage from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';

import ProfileSeller from 'components/ProfileSeller';
import {serverAddress} from 'constants/ServerAddress';

/**
 * Класс ProfileSellers - компонент, отображающий список продавцов на странице личного кабинета
 */
export default class ProfileSellers extends PureComponent {
  constructor(props) {
    super(props);

    // значения полей, используемых в render()
    this.state = {
      // Клиенты
      sellers: {},
      itemsLoaded: false,
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
    // Функция отображения сведений о клиенте
    itemHandle: PropTypes.func,
    jwtToken: PropTypes.string,
    getID: PropTypes.func,
  };

  componentDidMount() {
    const {jwtToken} = this.props;

    fetch(`${serverAddress}/api/member/producers`, {
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
              sellers: res.result,
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

  changeList = page => {
    const { jwtToken } = this.props;

    this.setState(
      prevState => {
        return {
          ...prevState,
          itemsLoaded: false,
        };
      }
    );
    fetch(`${serverAddress}/api/member/producers?page=${page}`, {
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
                sellers: res.result,
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
    const { error, sellers, itemsLoaded, currentPage, lastPage, firstPageEnable, prevPageEnable, nextPageEnable, lastPageEnable } = this.state;
    const { itemHandle, getID } = this.props;
    let content = '',
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
      content = <p>Ошибка: {error.message}</p>;
    }
    else if (!itemsLoaded) {
      content = <p className="load_info">Пожалуйста, подождите, идет загрузка страницы</p>;
    }
    else {
      if (sellers === undefined || sellers.length === 0 || sellers.producers === undefined || sellers.producers.length === 0) {
        content = <div className="load_info">
          <div/>
          <p>К сожалению у Вас еще нет поставщиков.</p>
        </div>;
      }
      else
        content = <div className="orders_content">
          {sellers.producers.map((item, idx) => {
          return (
            <ProfileSeller item={item} key={idx} itemHandle={itemHandle} getID={getID}/>
          );
        })}
        </div>;
    }
    return (
      <div className="seller_items">
        <div className="seller_items_header">
          <MyOrdersIcon className="my_orders_icon"/>
          <h2>Мои поставщики</h2>
        </div>
        {content}
        {paginationButtons}
      </div>
    );
  }
}