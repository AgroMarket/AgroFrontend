import './HorizontalMenu.scss';

import React, { Component } from 'react';
// Проверка свойств
import PropTypes from 'prop-types';

import FSMenuItem from 'components/FSMenuItem';

/**
 * Класс HorizontalMenu - компонент, отображающий горизонтальное меню
 */
export default class HorizontalMenu extends Component {
  // Проверка свойств
  static propTypes = {
    // Пункты меню - массив объектов
    menu: PropTypes.arrayOf(PropTypes.shape({
      // id пункта
      id:  PropTypes.string,
      // название пункта
      name: PropTypes.string,
    })),
    // класс для компонента
    className: PropTypes.string,
  };

  // значения атрибутов по умолчанию
  static defaultProps = {
    // аттрибут menu инициализируем пустым массивом
    menu: [],
    // имя класса отсутствует
    className: '',
  };

  // обновляем визуализацию компонента
  shouldComponentUpdate(nextProps) {
    return nextProps.className === this.props.className;
  }

  render() {
    // получаем переданные свойства меню
    const { menu } = this.props;
    return (
      <Menu>
        {menu.map( (item, idx) => {
          return (
            <FSMenuItem item={item} key={idx}/>
          );
        })}
      </Menu>
    );
  }
}