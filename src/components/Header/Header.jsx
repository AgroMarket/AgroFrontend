import './Header.scss';

import React, {PureComponent} from 'react';

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
  render() {
    return (
      <header>
        <div></div>
        <MainMenu menu={menu} className="main_menu"/>
        <FSButton item={loginButton} className="login_button"/>
        <div></div>
      </header>
    );
  }
}