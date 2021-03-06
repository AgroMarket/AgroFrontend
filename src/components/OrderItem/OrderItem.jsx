import './OrderItem.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button/Button';
import moment from 'moment';

// Данные для кнопки Открыть заказ
const openOrderButton = {
  id: 'open_sell_order',
  name: 'Открыть заказ',
};

/**
 * Класс OrderItem - компонент, отображающий строку со сведениями о заказе на странице продавца
 */
export default class OrderItem extends PureComponent {
  // Проверка свойств
  static propTypes = {
    // Пункты меню - массив объектов
    item: PropTypes.shape({
      // время заказа
      date: PropTypes.string,
      // общая стоимость заказа
      total: PropTypes.string,
      // состояние заказа
      status: PropTypes.string,
      // ссылка на заказ
      link: PropTypes.string,
    }),
    // Функция отображения сведений о заказе
    showOrderInfo: PropTypes.func,
  };

  render() {
    const { item, showOrderInfo } = this.props;
    const date = moment(item.order.date).format('DD.MM.YY HH:mm');

    return (
      <p className="seller_item">
        <span className="order_date">
          {date}
        </span>
        <span className="order_total">
          Заказ на сумму {item.order.total.toLocaleString('ru')} руб.
        </span>
        <span className="open_order">
          <Button
            className="edit_button"
            variant="contained"
            color="primary"
            id={openOrderButton.id}
            onClick={() => showOrderInfo(item.order.id)}
          >
            {openOrderButton.name}
          </Button>
        </span>
      </p>
    );
  }
}