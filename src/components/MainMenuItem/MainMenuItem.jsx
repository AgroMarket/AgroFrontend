import './MainMenuItem.scss';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
// Проверка свойств
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';

/**
 * Класс MainMenuItem - компонент, отображающий элемент меню в шапке страницы
 */
export default class MainMenuItem extends PureComponent {
  // Проверка свойств
  static propTypes = {
    // Пункты меню - массив объектов
    item: PropTypes.shape({
      // название пункта
      name: PropTypes.string,
      // адрес
      path: PropTypes.string,
    }),
  };
  
  render() {
    // получаем переданные свойства пункта главного меню сайта
    const { item } = this.props;

    return <Tab component={Link} label={item.title} to={item.api} {...this.props}/>;
  }
}