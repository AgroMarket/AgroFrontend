import './ProfileAccount.scss';

import React, { PureComponent } from 'react';

/**
 * Класс ProfileAccount - компонент, отображающий счет пользователя в системе FermaStore на странице личного кабинета
 */
export default class ProfileAccount extends PureComponent {
  constructor(props) {
    super(props);
    
    // значения полей, используемых в render()
    this.state = {
      
    };
  }
  
  render() {
    return (
      <p>ProfileAccount</p>
    );
  }
}