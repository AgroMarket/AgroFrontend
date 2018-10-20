import './AboutPage.scss';

import React, { PureComponent } from 'react';

/**
 * Класс AboutPage - компонент, отображающий страницу О нас
 */
export default class AboutPage extends PureComponent {
  constructor(props) {
    super(props);
    
    // значения полей, используемых в render()
    this.state = {
      
    };
  }
  
  render() {    
    return (
      <p>AboutPage</p>
    );
  }
}