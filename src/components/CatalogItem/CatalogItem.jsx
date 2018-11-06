import './CatalogItem.scss';

import React, { PureComponent } from 'react';
import {serverAddress} from '../../constants';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

// Данные для кнопки Добавить в корзину
const addToBasketButton = {id: 'addItemToBasket', name: 'Добавить в корзину'};

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
      if (!itemLoaded) {
        return <p>Пожалуйста, подождите, идет загрузка страницы</p>;
      }
      else {
        return (
          <div className="catalog_item">
            <div className="left_info">
              <h2 className="item_title">{catalogItem.title}</h2>
              <p className="item_description">{catalogItem.descripion}</p>
              <p className="item_seller">Производитель: {catalogItem.farmer_name}</p>
            </div>
            <div className="right_info">
              <img src={serverAddress+catalogItem.image} alt={catalogItem.image}/>
              <p className="item_price"><span className="item_counter"> + 1 -</span> {catalogItem.price} руб. / 1 {catalogItem.measures}</p>
              <Button
                className="add_to_basket_button"
                variant="contained"
                color="primary"
                id={addToBasketButton.id}>
                  {addToBasketButton.name}
              </Button>
            </div>
          </div>
        );
      }
  }
}