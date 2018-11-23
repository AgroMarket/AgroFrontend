import './BasketContacts.scss';

import React, {Fragment, PureComponent} from 'react';
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
    basketID: PropTypes.string,
    // функция отправки заказа
    handleOrderClick: PropTypes.func,
    jwtToken: PropTypes.string,
  };

  render() {
    const { handleOrderClick, jwtToken } = this.props;
    let content;
    if (jwtToken === '') {
      content = (<Fragment>
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
      </Fragment>);
    }
    else {
      content = <Fragment/>;
    }
    return (
      <div className="basket_contacts">
        { content }
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