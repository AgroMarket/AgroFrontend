import './ProfileAccount.scss';

import React, { PureComponent } from 'react';
import MyOrdersIcon from '@material-ui/icons/DateRange';
import Button from '@material-ui/core/Button/Button';
import PropTypes from 'prop-types';

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
    };
  }

  static propTypes = {
    // Функция отображения формы редактирования или создания товара
    itemHandle: PropTypes.func,
  };

  render() {
    const { money } = this.state;
    const { itemHandle } = this.props;

    return (
      <div className="profile_account seller_items">
        <div className="seller_items_header">
          <MyOrdersIcon className="my_orders_icon"/>
          <h2>Счет на Ferma Store</h2>
        </div>
        <p>Остаток денежных средств на счете {money} руб.</p>
        <Button
          className="add_money"
          variant="contained"
          color="primary"
          id={addMoneyButton.id}
          onClick={() => itemHandle('add_money_to_account')}
        >
          {addMoneyButton.name}
        </Button>
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