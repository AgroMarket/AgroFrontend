import './BuyerItem.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button/Button';
import moment from 'moment';

// Данные для кнопки Открыть заказ
const openOrderButton = {
  id: 'open_order',
  name: 'Открыть заказ',
};

/**
 * Класс BuyerItem - компонент, отображающий строку со сведениями о заказе на странице покупателя
 */
export default class ConsumerOrder extends PureComponent {
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
    itemHandle: PropTypes.func,
  };

  render() {
    const { item, itemHandle } = this.props;
    const date = moment(item.order.date).format('DD.MM.YY HH:mm');

    return (
      <p className="buyer_item">
        <span className="order_date">
          {date}
        </span>
        <span className="order_seller">
          {item.order.producer}
        </span>
        <span className="order_total">
          Заказ на сумму {item.order.total} руб.
        </span>
        <Button
          className="open_order_button"
          variant="contained"
          color="primary"
          id={openOrderButton.id}
          onClick={() => itemHandle('consumer_order_detail')}
        >
          {openOrderButton.name}
        </Button>
        <span className="order_status">
          Состояние: {item.order.status}
        </span>
      </p>
    );
  }
}