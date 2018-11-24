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
  constructor(props) {
    super(props);

    // значения полей, используемых в render()
    this.state = {
      email: '',
      password: '',
      name: '',
      phone: '',
      address: '',
    };
  }

  // Проверка свойств
  static propTypes = {
    // ID корзины на сервере
    basketID: PropTypes.string,
    // функция отправки заказа
    handleOrderClick: PropTypes.func,
    jwtToken: PropTypes.string,
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { email, password, name, phone, address } = this.state;
    const { handleOrderClick, jwtToken } = this.props;
    const user = {
      email: email,
      password: password,
      name: name,
      phone: phone,
      address: address,
    };

    let content;
    if (jwtToken === '') {
      content = (<Fragment>
        <p className="description">
          Чтобы продолжить, заполните свои данные
        </p>
        <input type="text" id="label_fio" name="name" onChange={this.handleChange} placeholder=' '/>
        <label className="contact_fio" htmlFor="label_fio">Фамилия Имя Отчество</label>
        <input type="text" id="label_city" name="contact_city" placeholder=' '/>
        <label className="contact_city" htmlFor="label_city">Город</label>
        <input type="text" id="label_address" name="address" onChange={this.handleChange} placeholder=' '/>
        <label className="contact_address" htmlFor="label_address">Адрес доставки</label>
        <input type="text" id="label_phone" name="phone" onChange={this.handleChange} placeholder=' '/>
        <label className="contact_phone" htmlFor="label_phone">Телефон</label>
        <input type="text" id="label_email" name="email" onChange={this.handleChange} placeholder=' '/>
        <label className="contact_email" htmlFor="label_email">Адрес электронной почты</label>
        <input type="text" id="label_password" name="password" onChange={this.handleChange} placeholder=' '/>
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
          onClick={() => handleOrderClick(user)}
        >
          {sendOrderButton.name}
        </Button>
      </div>
    );
  }
}