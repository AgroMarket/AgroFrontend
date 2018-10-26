import './App.scss';

import React, {Fragment, PureComponent} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
// Сброс CSS для браузеров
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from 'components/Header';

// машрутизация сайта
import routes from '../../routes';

/**
 * Класс App - корневой компонент, отображающий страницы сайта
 */
export default class App extends PureComponent {
  render() {
    return (
      <Fragment>
        <CssBaseline/>
        <BrowserRouter>
          <div className="container">
            <Header className="item header"/>
            <Switch className="item page">
              {routes.map((route, idx) => <Route key={idx} {...route}/>)}
            </Switch>
          </div>
        </BrowserRouter>
      </Fragment>
    );
  }
}