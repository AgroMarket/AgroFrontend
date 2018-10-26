import './App.scss';

import React, {Fragment, PureComponent} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
// Сброс CSS для браузеров
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from 'components/Header';
import Grid from '@material-ui/core/Grid';

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
          <Grid container justify="center">
            <Grid container={false}>
              <Header/>
            </Grid>
            <Grid container={false}>
              <Switch>
                {routes.map((route, idx) => <Route key={idx} {...route}/>)}
              </Switch>
            </Grid>
          </Grid>
        </BrowserRouter>
      </Fragment>
    );
  }
}