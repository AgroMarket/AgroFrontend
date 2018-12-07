import './ProfileProfit.scss';

import React, { PureComponent } from 'react';
import MyOrdersIcon from '@material-ui/icons/DateRange';
import Button from '@material-ui/core/Button/Button';
import PropTypes from 'prop-types';

import {serverAddress} from 'constants/ServerAddress';

// Данные для кнопки Перевести на счет
const returnMoneyButton = {
  id: 'return_money',
  name: 'Перевести на счет',
};
// Данные для кнопки Ввести данные заново
const getMoneyAgainButton = {
  id: 'try_again',
  name: 'Ввести другую сумму',
};

/**
 * Класс ProfileProfit - компонент, отображающий форму вывода денежных средств на банковский счет
 */
export default class ProfileProfit extends PureComponent {
  constructor(props) {
    super(props);

    // значения полей, используемых в render()
    this.state = {
      error: false,
      name: '',
      accountNumber: '',
      bank: '',
      amount: '',
    };
  }

  static propTypes = {
    itemHandle: PropTypes.func,
    jwtToken: PropTypes.string,
    userStatus: PropTypes.string,
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  sendMoney = () => {
    const { amount } = this.state;
    const { itemHandle, jwtToken } = this.props;
    const registerJSON = JSON.stringify({
      'transaction':
        {
          'amount': Number(amount),
          'type': 'withdrawal',
        },
    });

    fetch(`${serverAddress}/api/member/transactions`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
      },
      body: registerJSON,
    })
      .then(res => res.json())
      .then(res => {
        if (res.result.transaction.id !== null)
          itemHandle('profile_account');
        else
          this.setState(
            prevState => {
              return {
                ...prevState,
                error: true,
              };
            }
          );
      });
  };

  reset = () => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          error: false,
        };
      }
    );
  };

  render() {
    const { error, name, accountNumber, bank, amount } = this.state;

    if (error) {
      return <div>
        <p>Недостаточно денег на счете</p>
        <Button
          className="get_money"
          variant="contained"
          color="primary"
          id={getMoneyAgainButton.id}
          onClick={() => this.reset()}
        >
          {getMoneyAgainButton.name}
        </Button>
      </div>;
    }
    else
      return (
        <div className="details_for_return seller_items">
          <div className="seller_items_header">
            <MyOrdersIcon className="my_orders_icon"/>
            <h2>Вывод денежных средств из Ferma Store</h2>
          </div>
          <input
            type="text"
            id="label_name"
            name="name"
            placeholder=" "
            value={name}
            onChange={this.handleChange}
          />
          <label
            className="item_name"
            htmlFor="label_name"
          >
            Имя получателя денежных средств
          </label>
          <input
            type="text"
            id="label_account_number"
            name="accountNumber"
            placeholder=" "
            value={accountNumber}
            onChange={this.handleChange}
          />
          <label
            className="item_account_number"
            htmlFor="label_account_number"
          >
            Номер банковского счета
          </label>
          <input
            type="text"
            id="label_bank"
            name="bank"
            placeholder=" "
            value={bank}
            onChange={this.handleChange}
          />
          <label
            className="item_bank"
            htmlFor="label_bank"
          >
            Наименование банка
          </label>
          <input
            type="text"
            id="label_amount"
            name="amount"
            placeholder=" "
            value={amount}
            onChange={this.handleChange}
          />
          <label
            className="item_amount"
            htmlFor="label_amount"
          >
            Сумма перевода
          </label>
          <Button
            className="return_item"
            variant="contained"
            color="primary"
            id={returnMoneyButton.id}
            onClick={() => this.sendMoney()}
          >
            {returnMoneyButton.name}
          </Button>
        </div>
      );
  }
}