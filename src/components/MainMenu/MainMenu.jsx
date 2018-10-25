import './MainMenu.scss';

import React, {PureComponent} from 'react';
// Проверка свойств
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import MainMenuItem from 'components/MainMenuItem';

/**
 * Класс MainMenu - компонент, отображающий главное меню в шапке на всех страницах сайта
 */
export default class MainMenu extends PureComponent {
  state = {
    value: 0,
  };

  // Проверка свойств
  static propTypes = {
    // Пункты меню - массив объектов
    menu: PropTypes.arrayOf(PropTypes.shape({
      // id пункта
      id:  PropTypes.string,
      // название пункта
      name: PropTypes.string,
      // адрес
      path: PropTypes.string,
    })),
  };

  // значения атрибутов по умолчанию
  static defaultProps = {
    // аттрибут menu инициализируем пустым массивом
    menu: [],
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    // получаем переданные свойства меню
    const { menu } = this.props;
    // TODO выделение правильного пункта меню при прямом переходе по ссылке
    const { value } = this.state;

    return (
      <Tabs fullWidth value={value} onChange={this.handleChange} fullWidth={false} centered>
        {menu.map( (item, idx) => {
          return (
            <MainMenuItem item={item} key={idx}/>
          );
        })}
      </Tabs>
    );
  }
}