import './App.scss';

import React, { PureComponent} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
// Сброс CSS для браузеров
import CssBaseline from '@material-ui/core/CssBaseline';
import {MuiThemeProvider} from '@material-ui/core';
// Тема для Material-UI
import theme from '../../theme';
import Header from 'components/Header';
import Footer from 'components/Footer';
import HomePage from 'pages/HomePage';
import BasketPage from 'pages/BasketPage';
// машрутизация сайта
import routes from '../../routes';
import {storageAvailable} from 'helpers/localStorage';
import {serverAddress} from 'constants/ServerAddress';

/**
 * Класс App - корневой компонент, отображающий страницы сайта
 */
export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // ID корзины
      basketID: -1,
      // состояние создания корзины
      basketCreated: false,
      // ошибка загрузки
      error: null,
    };
  }

  // получает с сервера id новой корзины и сохраняет его в state
  getBasketID = () => {
    fetch(`${serverAddress}/api/carts`, {
      method: 'post',
    })
      .then(res => res.json())
      .then(res => {
          this.setState(
            prevState => {
              localStorage.setItem('basketID', res.result.id);
              return {
                ...prevState,
                basketID: String(res.result.id),
                basketCreated: true,
              };
            }
          );
        },
        error => {
          this.setState({
            basketCreated: true,
            error,
          });
        });
  };

  // проверяет наличие id корзины на сервере в случае отсутствия получает с сервера id новой корзины и сохраняет его в state
  loadBasketID = id => {
    fetch(`${serverAddress}/api/carts/${id}`)
      .then(res => res.json())
      .then(res => {
        // если на сервере корзина с указанным id не существует
        if (res.status !== 200 || this.state.getBasketID === -1)
          // то олучаем с сервера id для новой корзины
          this.getBasketID();
        else
          // иначе загружаем id корзины из localStorage
          this.setState(
            prevState => {
              return {
                ...prevState,
                basketID: localStorage.getItem('basketID'),
                basketCreated: true,
              };
            }
          );
      });
  };

  // Создаем корзину на сервере
  componentDidMount() {
    // если доступен localStorage браузера
    if (storageAvailable('localStorage')) {
      // если id корзины не существует
      if (!localStorage.getItem('basketID')) {
        // получаем с сервера id для новой корзины
        this.getBasketID();
      } else {
        // иначе загружаем id корзины из localStorage
        this.loadBasketID(localStorage.getItem('basketID'));
      }
    }
    // localStorage не доступен
    else {
      this.getBasketID();
    }
  }

  render() {
    const { error, basketCreated, basketID } = this.state;
    if (error) {
      return <p>Ошибка: {error.message}</p>;
    }
    else
    if (!basketCreated) {
      return <p className="load_info">Пожалуйста, подождите, идет загрузка страницы</p>;
    }
    else {
      return (
        <MuiThemeProvider theme={theme}>
          <CssBaseline/>
          <BrowserRouter>
            <div>
              <Header className="header"/>
              <Switch className="page">
                <Route exact path="/" render={(props) => (
                  <HomePage {...props} basketID={basketID} />
                )}/>
                {routes.map((route, idx) => <Route key={idx} basketID={basketID} {...route}/>)}
                <Route exact path="/basket" render={(props) => (
                  <BasketPage {...props} basketID={basketID} />
                )}/>
              </Switch>
              <Footer/>
            </div>
          </BrowserRouter>
        </MuiThemeProvider>
      );
    }
  }
}