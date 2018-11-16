import './SellerContent.scss';

import React, { PureComponent } from 'react';

/**
 * Класс SellerContent - компонент, отображающий ****** на странице
 */
export default class SellerContent extends PureComponent {
  constructor(props) {
    super(props);
    
    // значения полей, используемых в render()
    this.state = {
      
    };
  }
  
  render() {
    return (
      <p>SellerContent</p>
    );
  }
}