import './MainMenu.scss';

import React, {PureComponent} from 'react';
// Проверка свойств
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import MainMenuItem from 'components/MainMenuItem';

const menu = [
  {
    class: 'goto_main',
    title: '',
    url: '/',

  },
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
    const newValue = menulist.indexOf(/[^/]*$/.exec(window.location.href)[0]);
    this.setState({value: (newValue === -1) ? 0 : newValue});
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