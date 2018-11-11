import './BasketContacts.scss';

import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button/Button';
import PropTypes from 'prop-types';

// Данные для кнопки Оформить заказ
const sendOrderButton = {id: 'sendOrder', name: 'Оформить заказ'};

/**
 * Класс BasketContacts - компонент, отображающий форму с контактными данными на странице Корзина
 */
export default class BasketContacts extends PureComponent {
  // Проверка свойств
  static propTypes = {
    // ID корзины на сервере
    basketID: PropTypes.number,
    // функция отправки заказа
    handleOrderClick: PropTypes.func,
  };

  render() {
    const { handleOrderClick } = this.props;
    return (
      <div className="basket_contacts">
        <p className="description">
          Чтобы продолжить, заполните свои данные
        </p>
        <input type="text" id="label_fio" name="contact_fio" placeholder=' '/>
        <label className="contact_fio" htmlFor="label_fio">Фамилия Имя Отчество</label>
        <input type="text" id="label_city" name="contact_city" placeholder=' '/>
        <label className="contact_city" htmlFor="label_city">Город</label>
        <input type="text" id="label_address" name="contact_address" placeholder=' '/>
        <label className="contact_address" htmlFor="label_address">Адрес доставки</label>
        <input type="text" id="label_phone" name="contact_phone" placeholder=' '/>
        <label className="contact_phone" htmlFor="label_phone">Телефон</label>
        <input type="text" id="label_email" name="contact_email" placeholder=' '/>
        <label className="contact_email" htmlFor="label_email">Адрес электронной почты</label>
        <input type="text" id="label_password" name="contact_password" placeholder=' '/>
        <label className="contact_password" htmlFor="label_password">Пароль</label>
        <Button
          className="send_order_button"
          variant="contained"
          color="primary"
          onClick={() => handleOrderClick()}
        >
          {sendOrderButton.name}
        </Button>
      </div>
    );
  }
}