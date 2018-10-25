import './FSButton.scss';

import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';
// Проверка свойств
import PropTypes from 'prop-types';

/**
 * Класс FSButton - компонент, отображающий кнопку на странице
 */
export default class FSButton extends PureComponent {
  // Проверка свойств
  static propTypes = {
    // Кнопка - объект
    item: PropTypes.shape({
      // id кнопки
      id:  PropTypes.string,
      // название кнопки
      name: PropTypes.string,
    }),
  };

  // значения атрибутов по умолчанию
  static defaultProps = {
    // аттрибут item инициализируем пустым объектом
    item: {},
  };

  render() {
    // получаем переданные свойства кнопки
    const {id, name} = this.props.item;
    return (
      <Button variant="contained" color="primary" id={id}>
        {name}
      </Button>
    );
  }
}