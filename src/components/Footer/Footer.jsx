import './Footer.scss';

import React, { PureComponent } from 'react';

/**
 * Класс Footer - компонент, отображающий футер внизу страницы
 */
export default class Footer extends PureComponent {
  constructor(props) {
    super(props);
    
    // значения полей, используемых в render()
    this.state = {
      
    };
  }
  
  render() {
    return (
      <footer>
        <div/>
        <p>Ferma Store @ 2018</p>
        <div/>
      </footer>
    );
  }
}