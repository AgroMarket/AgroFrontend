import './MainPage.scss';

import React, { PureComponent } from 'react';

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
      <main className="container">
        <div className="home_header">
          <h1>
            Ferma Store
          </h1>
        </div>
      </main>
    );
  }
}