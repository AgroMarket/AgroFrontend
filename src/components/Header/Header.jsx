import './Header.scss';

import React, {PureComponent} from 'react';

import MainMenu from 'components/MainMenu';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

const linkToBasket = props => <Link to="/basket" {...props}/>;
// Данные для кнопки Корзина
const basketButton = {
  id: 'basket',
  name: 'Корзина',
};
// Данные для кнопки Вход
const loginButton = {
  id: 'login',
  name: 'Вход',
};

/**
 * Класс Header - компонент, отображающий хидер страницы
 * TODO сделать снятие выделения последнего открытого пункта меню в хидере
 */
export default class Header extends PureComponent {
  render() {
    return (
      <header>
        <div/>
        <MainMenu/>
        <div className="menu_buttons">
          <span className="basket_button">
            <Button
              component={linkToBasket}
              variant="contained"
              color="primary"
              id={basketButton.id}
            >
                {basketButton.name}
            </Button>
          </span>
          <span className="login_button">
            <Button
              color="primary"
              id={loginButton.id}
            >
                {loginButton.name}
            </Button>
          </span>
        </div>
        <div/>
      </header>
    );
  }
}