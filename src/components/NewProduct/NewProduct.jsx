import './NewProduct.scss';

import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button/Button';
import MyOrdersIcon from '@material-ui/icons/DateRange';

import {serverAddress} from 'constants/ServerAddress';
import PropTypes from 'prop-types';

// Данные для кнопки Сохранить изменения
const saveItemButton = {
  id: 'open_profile',
  name: 'Сохранить изменения',
};
// Данные для кнопки Загрузить фотографию товара
const loadItemPhotoButton = {
  id: 'open_profile',
  name: 'Загрузить фотографию товара',
};

/**
 * Класс NewProduct - компонент, отображающий форму создания нового продаваемого продукта на странице продавца
 */
export default class NewProduct extends PureComponent {
  constructor(props) {
    super(props);

    // значения полей, используемых в render()
    this.state = {
      // данные профиля
      categories: [],
      itemsLoaded: false,
      error: null,
      // название продукта
      name: '',
      // раздел каталога
      category: '',
      // единица измерения товара
      measures: '',
      // цена товара
      price: '',
      // описание товара
      description: '',
    };
  }

  // Проверка свойств
  static propTypes = {
    newItemCreated: PropTypes.func,
    newItem: PropTypes.string,
    id: PropTypes.number,
  };

  componentDidMount() {
    const { id } = this.props;
    fetch(`${serverAddress}/api/categories`)
      .then(res => res.json())
      .then(res => {
          this.setState(
            prevState => {
              return {
                ...prevState,
                categories: res.result,
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
        })
      .then(
        () => {
          if (this.props.newItem === 'false') {
            this.setState(
              prevState => {
                return {
                  ...prevState,
                  itemsLoaded: false,
                };
              }
            );
            fetch(`${serverAddress}/api/producer/products/${id}`)
              .then(res => res.json())
              .then(res => {
                const response = res.result.product;
                this.setState(
                  prevState => {
                    return {
                      ...prevState,
                      itemsLoaded: true,
                      name: response.title,
                      category: response.category_id,
                      measures: response.measures,
                      price: response.price,
                      description: response.descripion,
                    };
                  }
                );
              });
          }
        }
      );
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { error, categories, itemsLoaded, name, category, measures, price, description } = this.state;
    const { newItemCreated, newItem } = this.props;
    const item = {
      name: name,
      category: category,
      measures: measures,
      price: price,
      description: description,
    };

    if (error) {
      return <p>Ошибка: {error.message}</p>;
    }
    else
      if (!itemsLoaded) {
        return <p className="load_info">Пожалуйста, подождите, идет загрузка страницы</p>;
      }
      else
        return (
          <div className="seller_items">
            <div className="seller_items_header">
              <MyOrdersIcon className="my_orders_icon"/>
              <h2>Карточка товара</h2>
            </div>
            <div className="item_parameters">
              <div className="left_item_parameters">
                <input
                  type="text"
                  id="label_name"
                  name="name"
                  placeholder=" "
                  value={name}
                  onChange={this.handleChange}
                />
                <label
                  className="item_name"
                  htmlFor="label_name"
                >
                  Название товара
                </label>
                <select
                  id="label_category"
                  name="category"
                  value={category}
                  onChange={this.handleChange}
                >
                  <option value="" disabled="">Выберите категорию товара</option>
                  {
                    categories.categories.map( (item, idx) => {
                      return (
                        <option value={item.category.id} key={idx}>{item.category.name}</option>
                      );
                    })
                  }
                </select>
                <input
                  type="text"
                  id="label_measures"
                  name="measures"
                  placeholder=" "
                  value={measures}
                  onChange={this.handleChange}
                />
                <label
                  className="item_measures"
                  htmlFor="label_measures"
                >
                  Единицы измерения
                </label>
                <input
                  type="text"
                  id="label_price"
                  name="price"
                  placeholder=" "
                  value={price}
                  onChange={this.handleChange}
                />
                <label className="item_price" htmlFor="label_price">Цена</label>
              </div>
              <div className="right_item_parameters">
                <textarea
                  id="label_description"
                  name="description"
                  placeholder=' '
                  value={description}
                  onChange={this.handleChange}
                />
                <label className="item_description" htmlFor="label_description">Описание, состав, энергетическая ценность</label>
              </div>
              <div/>
              <div/>
              <input
                accept="image/*"
                className="load_photo"
                id="flat-button-file"
                placeholder=" "
                multiple
                type="file"
              />
              <label className="item_load" htmlFor="flat-button-file">
                <Button
                  component="span"
                  className="load_item_photo"
                  variant="text"
                  color="primary"
                  id={loadItemPhotoButton.id}
                >
                  {loadItemPhotoButton.name}
                </Button>
              </label>
              <Button
                className="save_item"
                variant="contained"
                color="primary"
                id={saveItemButton.id}
                onClick={() => newItemCreated('seller_items', item, newItem)}
              >
                {saveItemButton.name}
              </Button>
            </div>
          </div>
        );
  }
}