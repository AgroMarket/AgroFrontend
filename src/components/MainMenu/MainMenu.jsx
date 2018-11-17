import './MainMenu.scss';

import React, {PureComponent} from 'react';
// Проверка свойств
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import MainMenuItem from 'components/MainMenuItem';

const menu = [
  {
    class: 'goto_about',
    title: 'О нас',
    url: '/about',
  },
  {
    class: 'goto_sellers',
    title: 'Продавцам',
    url: '/sellers',
  },
  {
    class: 'goto_buyers',
    title: 'Покупателям',
    url: '/buyers',
  },
  {
    class: 'goto_delivery',
    title: 'Доставка и оплата',
    url: '/delivery',
  },
];

/**
 * Класс MainMenu - компонент, отображающий главное меню в шапке на всех страницах сайта
 */
export default class MainMenu extends PureComponent {
  // Проверка свойств
  static propTypes = {
    // Пункты меню - массив объектов
    menu: PropTypes.arrayOf(PropTypes.shape({
      // название пункта
      name: PropTypes.string,
      // адрес
      path: PropTypes.string,
    })),
    // активный пункт меню
    indicator: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.bool,
    ]),
    // функция выбора активного пункта меню
    handleChange: PropTypes.func,
  };

  // значения атрибутов по умолчанию
  static defaultProps = {
    // аттрибут menu инициализируем пустым массивом
    menu: [],
  };

  render() {
    const { indicator, handleChange } = this.props;

    return (
      <Tabs
        fullWidth
        className="main_menu"
        value={indicator}
        onChange={handleChange}
        centered
      >
        {menu.map( (item, idx) => {
          return (
            <MainMenuItem item={item} key={idx}/>
          );
        })}
      </Tabs>
    );
  }
}