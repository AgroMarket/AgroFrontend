import './CatalogList.scss';

import React, { PureComponent } from 'react';
import ItemCard from 'components/ItemCard';

/**
 * Класс CatalogList - компонент, отображающий товары каталога на странице
 */
export default class CatalogList extends PureComponent {
  constructor(props) {
    super(props);
    
    // значения полей, используемых в render()
    this.state = {
      
    };
  }
  
  render() {
    // получаем переданные свойства каталога
    const { items } = this.props;
    return (
      <div className="catalog_items">
        {items.map( (item, idx) => {
          return (
            <ItemCard item={item} key={idx}/>
          );
        })}
      </div>
    );
  }
}