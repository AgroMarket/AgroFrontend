import './App.scss';

import React, { PureComponent} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
// Сброс CSS для браузеров
import CssBaseline from '@material-ui/core/CssBaseline';
import {MuiThemeProvider} from '@material-ui/core';
// Тема для Material-UI
import { theme } from '../../theme';
import Header from 'components/Header';
import Footer from 'components/Footer';
import HomePage from 'pages/HomePage';
import BasketPage from 'pages/BasketPage';
// машрутизация сайта
import routes from '../../routes';
import {serverAddress} from 'constants/ServerAddress';

/**
 * Класс App - корневой компонент, отображающий страницы сайта
 */
export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // TODO использовать redux для хранения id корзины
      // ID корзины
      basketID: -1,
      // состояние создания корзины
      basketCreated: false,
      // ошибка загрузки
      error: null,
    };
  }

  // Создаем корзину на сервере
  componentDidMount() {
    fetch(`${serverAddress}/api/carts`, {
      method: 'post',
    })
      .then(res => res.json())
      .then(res => {
          this.setState(
            prevState => {
              return {
                ...prevState,
                basketID: res.result.id,
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
            <div className="container">
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