import './MainMenu.scss';

import React, {PureComponent} from 'react';
// Проверка свойств
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import MainMenuItem from 'components/MainMenuItem';

const menu = [
  {
    class: 'menu_main',
    title: '',
    url: '/',

  },
  {
    class: 'menu_about',
    title: 'О нас',
    url: '/about',
  },
  {
    class: 'menu_sellers',
    title: 'Продавцам',
    url: '/sellers',
  },
  {
    class: 'menu_buyers',
    title: 'Покупателям',
    url: '/buyers',
  },
  {
    class: 'menu_delivery',
    title: 'Доставка и оплата',
    url: '/delivery',
  },
];

/**
 * Класс MainMenu - компонент, отображающий главное меню в шапке на всех страницах сайта
 */
export default class MainMenu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    };
  }

  // Проверка свойств
  static propTypes = {
    // Пункты меню - массив объектов
    menu: PropTypes.arrayOf(PropTypes.shape({
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

  componentDidMount() {
    // Выделение пункта меню при прямом переходе по ссылке
    const menulist = ['', 'about', 'sellers', 'buyers', 'delivery'];
    // ищем в url из адресной строки текст после слэша
    this.setState({value: menulist.indexOf(/[^/]*$/.exec(window.location.href)[0])});
  }

  render() {
    const { value } = this.state;

    return (
      <Tabs fullWidth className="main_menu" value={value} onChange={this.handleChange} centered>
        {menu.map( (item, idx) => {
          return (
            <MainMenuItem item={item} key={idx}/>
          );
        })}
      </Tabs>
    );
  }
}