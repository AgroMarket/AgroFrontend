import './ProfileMoney.scss';

import React, { PureComponent } from 'react';
import MyOrdersIcon from '@material-ui/icons/DateRange';
import Button from '@material-ui/core/Button/Button';
import PropTypes from 'prop-types';

import {serverAddress} from 'constants/ServerAddress';

// Данные для кнопки Пополнить счет
const sendMoneyButton = {
  id: 'send_money',
  name: 'Пополнить счет',
};

/**
 * Класс ProfileMoney - компонент, отображающий форму для пополнения счета на странице личного кабинета
 */
export default class ProfileMoney extends PureComponent {
  constructor(props) {
    super(props);

    // значения полей, используемых в render()
    this.state = {
      name: '',
      cardNumber: '',
      dayExpire: '',
      ccv: '',
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
        'type': 'replenish',
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
      .then(
        () => itemHandle('profile_account')
      );
  };

  render() {
    const { name, cardNumber, dayExpire, ccv, amount } = this.state;

    return (
      <div className="details_for_pay seller_items">
        <div className="seller_items_header">
          <MyOrdersIcon className="my_orders_icon"/>
          <h2>Пополнение счета на Ferma Store</h2>
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
          Имя держателя карты
        </label>
        <input
          type="text"
          id="label_card_number"
          name="cardNumber"
          placeholder=" "
          value={cardNumber}
          onChange={this.handleChange}
        />
        <label
          className="item_card_number"
          htmlFor="label_card_number"
        >
          Номер карты
        </label>
        <input
          type="text"
          id="label_day_expire"
          name="dayExpire"
          placeholder=" "
          value={dayExpire}
          onChange={this.handleChange}
        />
        <label
          className="item_day_expire"
          htmlFor="label_day_expire"
        >
          Срок действия
        </label>
        <input
          type="text"
          id="label_ccv"
          name="ccv"
          placeholder=" "
          value={ccv}
          onChange={this.handleChange}
        />
        <label
          className="item_ccv"
          htmlFor="label_ccv"
        >
          CCV
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
          Сумма для зачисления на счет
        </label>
        <Button
          className="save_item"
          variant="contained"
          color="primary"
          id={sendMoneyButton.id}
          onClick={() => this.sendMoney()}
        >
          {sendMoneyButton.name}
        </Button>
      </div>
    );
  }
}