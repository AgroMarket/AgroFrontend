import './SellerOrder.scss';

import React, { PureComponent } from 'react';

/**
 * Класс SellerOrder - компонент, отображающий подробные сведения о заказе на странице продавца
 */
export default class SellerOrder extends PureComponent {
  constructor(props) {
    super(props);
    
    // значения полей, используемых в render()
    this.state = {
      
    };
  }
  
  render() {
    return (
      <p>SellerOrder</p>
    );
  }
}