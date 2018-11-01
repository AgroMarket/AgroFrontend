import './Header.scss';

import React, {PureComponent} from 'react';

import MainMenu from 'components/MainMenu';
import FSButton from 'components/FSButton';
import {serverAddress} from '../../constants';

// Данные для кнопки Вход
const loginButton = {id: 'login', name: 'Вход'};

/**
 * Класс Header - компонент, отображающий хидер страницы
 */
export default class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      menu: [],
      isLoaded: false,
      error: null,
    };
  }

  componentDidMount() {
    fetch(`${serverAddress}/api/mainmenu`)
      .then(res => res.json())
      .then(res => {
        this.setState({items: res});
        this.setState({isLoaded: true});
        },
      error => {
        this.setState({
          isLoaded: true,
          error,
        });
      });
  }

  render() {
    const { error, isLoaded, menu } = this.state;
    if (error) {
      return <p>Ошибка: {error.message}</p>;
    }
    else
    // Отображаем main
    if (!isLoaded) {
      return <p>Пожалуйста, подождите, идет загрузка страницы</p>;
    }
    else {
      return (
        <header>
          <div/>
          <MainMenu menu={menu} className="main_menu"/>
          <FSButton item={loginButton} className="login_button"/>
          <div/>
        </header>
      );
    }
  }
}