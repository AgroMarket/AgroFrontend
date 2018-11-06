import './CatalogItem.scss';

import React, { PureComponent } from 'react';
import {serverAddress} from '../../constants';
import PropTypes from 'prop-types';

/**
 * Класс CatalogItem - компонент, отображающий сведения о товаре на странице
 */
export default class CatalogItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // товар каталога
      catalogItem: {},
      // состояние загрузки товара каталога
      itemLoaded: false,
      // ошибка загрузки
      error: null,
    };
  }

  // Проверка свойств
  static propTypes = {
    // Адрес для просмотра информации о товаре каталога
    item: PropTypes.string,
  };

  // значения атрибутов по умолчанию
  static defaultProps = {
    // аттрибут items инициализируем пустым массивом
    item: {},
  };

  componentDidMount() {
    fetch(`${serverAddress}${this.props.item}`)
      .then(res => res.json())
      .then(res => {
          this.setState({catalogItem: res.result});
          this.setState({itemLoaded: true});
        },
        error => {
          this.setState({
            itemLoaded: true,
            error,
          });
        });
  }

  render() {
    // получаем переданные свойства товаров каталога
    const { error, itemLoaded, catalogItem } = this.state;
    if (error) {
      return <p>Ошибка: {error.message}</p>;
    }
    else
    // Отображаем main
    if (!itemLoaded) {
      return <p>Пожалуйста, подождите, идет загрузка страницы</p>;
    }
    else {
      return (
        <div className="catalog_item">
          {catalogItem.title}
          <img src={serverAddress+catalogItem.image} alt={catalogItem.image}/>
          {catalogItem.price} руб. / 1 {catalogItem.measures}
        </div>
      );
    }
  }
}