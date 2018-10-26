import './MainPage.scss';

import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';

/**
 * Класс HomePage - компонент, отображающий главную страницу
 */
export default class MainPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    // Отображаем main
    return (
      <Grid container>
        <main>
          <h1>
            Ferma Store
          </h1>
        </main>
      </Grid>
    );
  }
}