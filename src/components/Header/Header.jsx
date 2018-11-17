import './Header.scss';

import React, {PureComponent} from 'react';

import MainMenu from 'components/MainMenu';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

const linkToMain = props => <Link to="/" {...props}/>;
const linkToBasket = props => <Link to="/basket" {...props}/>;
const linkToLogin = props => <Link to="/login" {...props}/>;

// Данные для кнопки Главная
const gotoMainButton = {
  id: 'main',
  name: ' ',
};
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
 */
export default class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      enableTabIndicator: false,
    };
  }

  componentDidMount() {
    // Выделение пункта меню при прямом переходе по ссылке
    const menuList = ['about', 'sellers', 'buyers', 'delivery'];
    // ищем в url из адресной строки текст после слэша
    const newValue = menuList.indexOf(/[^/]*$/.exec(window.location.href)[0]);
    this.setState(
      prevState => {
        return {
          ...prevState,
          enableTabIndicator: (newValue === -1) ? false : newValue,
        };
      }
    );
  }

  closeAllMenuTabs = () => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          enableTabIndicator: false,
        };
      }
    );
  };

  handleChange = (event, value) => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          enableTabIndicator: value,
        };
      }
    );
  };

  render() {
    const { enableTabIndicator } = this.state;
    return (
      <header>
        <div/>
        <div className="goto_main">
          <Button className="goto_main"
            component={linkToMain}
            variant="text"
            id={gotoMainButton.id}
            onClick={this.closeAllMenuTabs}
          >
            {gotoMainButton.name}
          </Button>
        </div>
        <MainMenu indicator={enableTabIndicator} handleChange={this.handleChange}/>
        <div className="menu_buttons">
          <span className="basket_button">
            <Button
              component={linkToBasket}
              variant="contained"
              color="primary"
              id={basketButton.id}
              onClick={this.closeAllMenuTabs}
            >
                {basketButton.name}
            </Button>
          </span>
          <span className="login_button">
            <Button
              component={linkToLogin}
              color="primary"
              id={loginButton.id}
              onClick={this.closeAllMenuTabs}
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