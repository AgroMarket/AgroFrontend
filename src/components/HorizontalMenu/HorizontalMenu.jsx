import './HorizontalMenu.scss';

import React, { Component } from 'react';
import { Nav } from 'reactstrap';
// Проверка свойств
import PropTypes from 'prop-types';

import MenuItem from 'components/MenuItem';

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
      <Nav>
        {menu.map( (item, idx) => {
          return (
            <MenuItem item={item} key={idx}/>
          );
        })}
      </Nav>
    );
  }
}