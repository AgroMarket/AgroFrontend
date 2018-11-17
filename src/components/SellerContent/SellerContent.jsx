import './SellerContent.scss';

import React, { PureComponent } from 'react';
import SellerItems from 'components/SellerItems';

/**
 * Класс SellerContent - компонент, отображающий данные для выбранного пункта меню на странице продавца
 */
export default class SellerContent extends PureComponent {
  constructor(props) {
    super(props);
    
    // значения полей, используемых в render()
    this.state = {
      
    };
  }
  
  render() {
    //const { section, itemHandle } = this.props;
    return (
      <div className="seller_content">
        <SellerItems/>
      </div>
    );
  }
}