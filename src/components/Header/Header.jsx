import './Header.scss';

import React, {PureComponent} from 'react';
// Проверка свойств
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import MainMenu from 'components/MainMenu';
import FSButton from 'components/FSButton';

// Список пунктов меню
const menu = [
  // Главная (стартовая) страница Ferma Store
  {
    id: 'main',
    name: 'Ferma Store',
    path: '/',
  },
  // О нас
  {
    id: 'about',
    name: 'О нас',
    path: '/about',
  },
  // Продавцам
  {
    id: 'sellers',
    name: 'Продавцам',
    path: '/sellers',
  },
  // Покупателям
  {
    id: 'buyers',
    name: 'Покупателям',
    path: '/buyers',
  },
  // Доставка и оплата
  {
    id: 'delivery',
    name: 'Доставка и оплата',
    path: '/delivery',
  },
  // Корзина
  {
    id: 'basket',
    name: 'Корзина',
    path: '/basket',
  },
];

// Данные для кнопки Вход
const loginButton = {id: 'login', name: 'Войти'};

/**
 * Класс Header - компонент, отображающий хидер страницы
 */
export default class Header extends PureComponent {
  // Проверка свойств
  static propTypes = {
    // класс для компонента
    className: PropTypes.string,
  };

  // значения атрибутов по умолчанию
  static defaultProps = {
    // имя класса отсутствует
    className: '',
  };

  render() {
    return (
        <header>
          <Grid container spacing={24}>
            <Grid item xl={11}>
              {/* Меню навигации */}
              <MainMenu menu={menu}/>
            </Grid>
            <Grid item xl={1}>
              <FSButton item={loginButton}/>
            </Grid>
          </Grid>
        </header>
    );
  }
}