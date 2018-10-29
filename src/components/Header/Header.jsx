import './Header.scss';

import React, {PureComponent} from 'react';

import MainMenu from 'components/MainMenu';
import FSButton from 'components/FSButton';
// TODO удалить mock.json
import mainMenuData from 'mocks/mainmenu.json';

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
    // TODO включить прием данных с сервера
    /*    fetch('http://80.211.153.183:3000/api/mainmenu')
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
          });*/
    // TODO удалить mock.json
    this.setState({menu: mainMenuData});
    this.setState({isLoaded: true});
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