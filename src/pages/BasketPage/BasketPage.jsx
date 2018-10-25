import './BasketPage.scss';

import React, { PureComponent } from 'react';

/**
 * Класс BasketPage - компонент, отображающий страницу Корзина
 */
export default class BasketPage extends PureComponent {
  constructor(props) {
    super(props);
    
    // значения полей, используемых в render()
    this.state = {
      
    };
  }
  
  render() {    
    return (
      <p>BasketPage</p>
    );
  }
}