import './CatalogList.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ItemCard from 'components/ItemCard';
import {serverAddress} from 'constants/ServerAddress';

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
    // Функция отображения информации о товаре
    itemHandle: PropTypes.func,
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
          this.setState(
            prevState => {
              return {
                ...prevState,
                catalogItems: res.result,
                itemsLoaded: true,
              };
            }
          );
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
      this.setState(
        prevState => {
          return {
            ...prevState,
            itemsLoaded: false,
          };
        }
      );
      fetch(`${serverAddress}${this.props.section}`)
        .then(res => res.json())
        .then(res => {
            this.setState(
              prevState => {
                return {
                  ...prevState,
                  catalogItems: res.result,
                  itemsLoaded: true,
                };
              }
            );
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
    const { itemHandle } = this.props;
    if (error) {
      return <p>Ошибка: {error.message}</p>;
    }
    else
      if (!itemsLoaded) {
        return <p className="load_info">Пожалуйста, подождите, идет загрузка страницы</p>;
      }
      else
        if (catalogItems === undefined || catalogItems.length === 0 || catalogItems.products === undefined || catalogItems.products.length === 0) {
          return <p className="load_info">Товары не найдены</p>;
        }
        else
          return (
            <div className="catalog_items">
              {catalogItems.products.map( (item, idx) => {
                return (
                  <ItemCard item={item} itemHandle={itemHandle} key={idx}/>
                );
              })}
            </div>
          );
  }
}