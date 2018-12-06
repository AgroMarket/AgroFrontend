import './ProfileAccount.scss';

import React, { PureComponent } from 'react';
import MyOrdersIcon from '@material-ui/icons/DateRange';
import Button from '@material-ui/core/Button/Button';
import PropTypes from 'prop-types';

import {serverAddress} from 'constants/ServerAddress';
import {buyer, seller, admin, delivery} from 'constants/AuthorizationTypes';

// Данные для кнопки Пополнить счёт
const addMoneyButton = {
  id: 'add_money',
  name: 'Пополнить счёт',
};
// Данные для кнопки Забрать средства со счета
const getMoneyButton = {
  id: 'get_money',
  name: 'Забрать средства со счета',
};

/**
 * Класс ProfileAccount - компонент, отображающий счет пользователя в системе FermaStore на странице личного кабинета
 */
export default class ProfileAccount extends PureComponent {
  constructor(props) {
    super(props);
    
    // значения полей, используемых в render()
    this.state = {
      money: 0,
      itemsLoaded: false,
    };
  }

  static propTypes = {
    // Функция отображения формы редактирования или создания товара
    itemHandle: PropTypes.func,
    jwtToken: PropTypes.string,
    userStatus: PropTypes.string,
  };

  componentDidMount() {
    const {jwtToken, userStatus} = this.props;
    let user;

    if (userStatus === seller) {
      user = 'producer';
    }
    else
      if (userStatus === buyer || userStatus === delivery || userStatus === admin) {
        user = 'consumer';
      }
    fetch(`${serverAddress}/api/${user}/profile`, {
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
                money: res.result.profile.amount,
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
    const { error, money, itemsLoaded } = this.state;
    const { itemHandle, userStatus } = this.props;

    if (error) {
      return <p>Ошибка: {error.message}</p>;
    }
    else
      if (!itemsLoaded) {
        return <p className="load_info">Пожалуйста, подождите, идет загрузка страницы</p>;
      }
      else {
        let addMoney = '';
        if (userStatus === buyer || userStatus === seller) {
          addMoney = <Button
            className="add_money"
            variant="contained"
            color="primary"
            id={addMoneyButton.id}
            onClick={() => itemHandle('add_money_to_account')}
          >
            {addMoneyButton.name}
          </Button>;
        }

        return (
          <div className="profile_account seller_items">
            <div className="seller_items_header">
              <MyOrdersIcon className="my_orders_icon"/>
              <h2>Счет на Ferma Store</h2>
            </div>
            <p>Остаток денежных средств на счете {money.toLocaleString('ru')} руб.</p>
            {addMoney}
            <Button
              className="get_money"
              variant="contained"
              color="primary"
              id={getMoneyButton.id}
              onClick={() => itemHandle('get_money_from_account')}
            >
              {getMoneyButton.name}
            </Button>
          </div>
        );
      }
  }
}