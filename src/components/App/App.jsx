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

// машрутизация сайта
import routes from '../../routes';

/**
 * Класс App - корневой компонент, отображающий страницы сайта
 */
export default class App extends PureComponent {
  render() {
    return (
      <MuiThemeProvider theme = { theme }>
        <CssBaseline/>
        <BrowserRouter>
          <div className="container">
            <Header className="header"/>
            <Switch className="page">
              {routes.map((route, idx) => <Route key={idx} {...route}/>)}
            </Switch>
            <Footer/>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}