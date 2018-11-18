import './NewProduct.scss';

import React, { PureComponent } from 'react';

/**
 * Класс NewProduct - компонент, отображающий форму создания нового продаваемого продукта на странице продавца
 */
export default class NewProduct extends PureComponent {
  constructor(props) {
    super(props);
    
    // значения полей, используемых в render()
    this.state = {
      
    };
  }
  
  render() {
    return (
      <p>NewProduct</p>
    );
  }
}