import './CatalogList.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ItemCard from 'components/ItemCard';
import {serverAddress} from '../../constants';

/**
 * Класс CatalogList - компонент, отображающий товары каталога на странице
 */
export default class CatalogList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // товары каталога
      catalogItems: [],
      // состояние загрузки товаров каталога
      itemsLoaded: false,
      // ошибка загрузки
      error: null,
    };
  }

  // Проверка свойств
  static propTypes = {
    // Пункты меню - массив объектов
    items: PropTypes.arrayOf(PropTypes.shape({
      // название товара
      title: PropTypes.string,
      // единица измерения товара
      measures: PropTypes.string,
      // цена товара
      price: PropTypes.number,
    })),
    // Путь в адресной строке
    section: PropTypes.string,
  };

  // значения атрибутов по умолчанию
  static defaultProps = {
    // аттрибут items инициализируем пустым массивом
    items: [],
  };

  componentDidMount() {
    fetch(`${serverAddress}${this.props.section}`)
        .then(res => res.json())
        .then(res => {
          this.setState({catalogItems: res.result.products});
          this.setState({itemsLoaded: true});
          },
        error => {
          this.setState({
            itemsLoaded: true,
            error,
          });
        });
  }

  componentDidUpdate(prevProps) {
    if(prevProps.section !== this.props.section) {
      this.setState({itemsLoaded: false});
      fetch(`${serverAddress}${this.props.section}`)
        .then(res => res.json())
        .then(res => {
            this.setState({catalogItems: res.result.products});
            this.setState({itemsLoaded: true});
          },
          error => {
            this.setState({
              itemsLoaded: true,
              error,
            });
          });
    }
  }

  render() {
    // получаем переданные свойства товаров каталога
    const { error, itemsLoaded, catalogItems } = this.state;
    if (error) {
      return <p>Ошибка: {error.message}</p>;
    }
    else
    // Отображаем main
    if (!itemsLoaded) {
      return <p>Пожалуйста, подождите, идет загрузка страницы</p>;
    }
    else {
      return (
        <div className="catalog_items">
          {catalogItems.map( (item, idx) => {
            return (
              <ItemCard item={item} key={idx}/>
            );
          })}
        </div>
      );
    }
  }
}