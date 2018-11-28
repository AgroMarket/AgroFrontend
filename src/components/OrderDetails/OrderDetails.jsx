import './OrderDetails.scss';

import React, { PureComponent } from 'react';

/**
 * Класс OrderDetails - компонент, отображающий подробные сведения о заказе на странице продавца
 */
export default class OrderDetails extends PureComponent {
  constructor(props) {
    super(props);
    
    // значения полей, используемых в render()
    this.state = {
      
    };
  }
  
  render() {
    return (
      <p>ConsumerOrderDetail</p>
    );
  }
}