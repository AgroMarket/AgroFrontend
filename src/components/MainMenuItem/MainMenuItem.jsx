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
  constructor(props) {
    super(props);
  }

  // Проверка свойств
  static propTypes = {
    // Пункты меню - массив объектов
    item: PropTypes.shape({
      // id пункта
      id: PropTypes.string,
      // название пункта
      name: PropTypes.string,
      // адрес
      path: PropTypes.string,
    }),
  };
  
  render() {
    const { item } = this.props;

    return <Tab component={Link} label={item.name} to={item.path} {...this.props}/>;
  }
}