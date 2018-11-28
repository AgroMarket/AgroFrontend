import './ProfileSellers.scss';

import React, { PureComponent } from 'react';
import MyOrdersIcon from '@material-ui/icons/DateRange';
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
    fetch(`${serverAddress}/api/consumer/producers`, {
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
  }

  render() {
    const {error, sellers, itemsLoaded} = this.state;
    const {itemHandle, getID } = this.props;
    if (error) {
      return <p>Ошибка: {error.message}</p>;
    }
    else if (!itemsLoaded) {
      return <p className="load_info">Пожалуйста, подождите, идет загрузка страницы</p>;
    }
    else {
      let content;
      if (sellers === undefined || sellers.length === 0 || sellers.producers === undefined || sellers.producers.length === 0) {
        content = <div className="load_info">
          <div/>
          <p>К сожалению у Вас еще нет поставщиков.</p>
        </div>;
      }
      else
        content = (sellers.producers.map((item, idx) => {
          return (
            <ProfileSeller item={item} key={idx} itemHandle={itemHandle} getID={getID}/>
          );
        }));
      return (
        <div className="seller_items">
          <div className="seller_items_header">
            <MyOrdersIcon className="my_orders_icon"/>
            <h2>Мои поставщики</h2>
          </div>
          {content}
        </div>
      );
    }
  }
}