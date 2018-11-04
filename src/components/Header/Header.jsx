import './Header.scss';

import React, {PureComponent} from 'react';

import MainMenu from 'components/MainMenu';
import Button from '@material-ui/core/Button';

// Данные для кнопки Корзина
const basketButton = {id: 'basket', name: 'Корзина'};
// Данные для кнопки Вход
const loginButton = {id: 'login', name: 'Вход'};

/**
 * Класс Header - компонент, отображающий хидер страницы
 */
export default class Header extends PureComponent {
  render() {
    return (
      <header>
        <div/>
        <MainMenu/>
        <Button
          className="basket_button"
          variant="contained"
          color="primary"
          id={basketButton.id}>
            {basketButton.name}
        </Button>
        <Button
          className="login_button"
          color="primary"
          id={loginButton.id}>
          {loginButton.name}
        </Button>
        <div/>
      </header>
    );
  }
}