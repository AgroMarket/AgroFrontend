import './CatalogList.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ItemCard from 'components/ItemCard';

/**
 * Класс CatalogList - компонент, отображающий товары каталога на странице
 */
export default class CatalogList extends PureComponent {
  // Проверка свойств
  static propTypes = {
    // Пункты меню - массив объектов
    items: PropTypes.arrayOf(PropTypes.shape({
      // название товара
      title: PropTypes.string,
      // количество товара за предлагаемую цену
      quantity: PropTypes.number,
      // единица измерения товара
      measures: PropTypes.string,
      // цена товара
      price: PropTypes.number,
    })),
  };

  // значения атрибутов по умолчанию
  static defaultProps = {
    // аттрибут items инициализируем пустым массивом
    items: [],
  };

  render() {
    // получаем переданные свойства товаров каталога
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