import './DeliveryItem.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button/Button';
import moment from 'moment';

// Данные для кнопки Открыть заказ
const openOrderButton = {
  id: 'open_delivery_order',
  name: 'Открыть заказ',
};

/**
 * Класс DeliveryItem - компонент, отображающий строку со сведениями о заказе на доставку
 */
export default class DeliveryItem extends PureComponent {
  // Проверка свойств
  static propTypes = {
    // Пункты меню - массив объектов
    // TODO написать структуру объекта
    item: PropTypes.shape(),
    // Функция отображения сведений о заказе
    showOrderInfo: PropTypes.func,
  };
  
  render() {
    const { item, showOrderInfo } = this.props;
    // TODO выяснить какое поле отвечает за дату передачи товара в службу доставки
    const date = moment(item.task.task_start).format('DD.MM.YY HH:mm');

    return (
      <p className="seller_item">
        <span className="order_date">
          {date}
        </span>
        <span className="order_total">
          Заказ на сумму {item.task.delivery_cost.toLocaleString('ru')} руб.
        </span>
        <Button
          className="edit_button"
          variant="contained"
          color="primary"
          id={openOrderButton.id}
          onClick={() => showOrderInfo(item.task.id)}
        >
          {openOrderButton.name}
        </Button>
        <span className="order_status">
          Состояние: {item.task.status}
        </span>
      </p>
    );
  }
}