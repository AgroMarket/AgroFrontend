import './ClientProfile.scss';

import React, { PureComponent } from 'react';

/**
 * Класс ClientProfile - компонент, отображающий профиль клиента на странице продавца
 */
export default class ClientProfile extends PureComponent {
  constructor(props) {
    super(props);
    
    // значения полей, используемых в render()
    this.state = {
      
    };
  }
  
  render() {
    return (
      <p>ClientProfile</p>
    );
  }
}