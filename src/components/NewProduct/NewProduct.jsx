import './NewProduct.scss';

import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button/Button';
import MyOrdersIcon from '@material-ui/icons/DateRange';
import PropTypes from 'prop-types';

import {serverAddress} from 'constants/ServerAddress';

// Данные для кнопки Сохранить изменения
const saveItemButton = {
  id: 'save_item',
  name: 'Выставить товар на продажу',
};
// Данные для кнопки Загрузить фотографию товара
const loadItemPhotoButton = {
  id: 'load_item_photo',
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
      // дерево категорий каталога товаров
      categories: [],
      // подкатегории выбранной категории товаров
      subcategories: [],
      itemsLoaded: false,
      error: null,
      // название продукта
      name: '',
      // родительский элемент каталога
      categoryParent: '',
      // подраздел каталога
      categoryChild: '',
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
    newItem: PropTypes.bool,
    id: PropTypes.number,
    jwtToken: PropTypes.string,
  };

  componentDidMount() {
    const { id, jwtToken } = this.props;
    fetch(`${serverAddress}/api/categories`)
      .then(res => res.json())
      .then(res => {
          this.setState(
            prevState => {
              return {
                ...prevState,
                categories: res.result.categories,
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
          if (!this.props.newItem) {
            const {categories} = this.state;
            this.setState(
              prevState => {
                return {
                  ...prevState,
                  itemsLoaded: false,
                };
              }
            );
            fetch(`${serverAddress}/api/member/products/${id}`, {
              headers: {
                'Authorization': `Bearer ${jwtToken}`,
              },
            })
              .then(res => res.json())
              .then(res => {
                const response = res.result.product;
                const parent = response.parent_category_id;
                const subcategories = categories.filter(item => {
                  return (
                    item.category.id === parent
                  );
                });

                this.setState(
                  prevState => {
                    return {
                      ...prevState,
                      itemsLoaded: true,
                      name: response.title,
                      categoryParent: parent,
                      subcategories: subcategories[0].category.children,
                      categoryChild: response.category_id,
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

  handleCategoryChange = event => {
    const { categories } = this.state;
    const value = Number(event.target.value);

    const subcategories = categories.filter(item => {
      return (
        item.category.id === value
      );
    });
    this.setState({
      [event.target.name]: value,
      subcategories: subcategories[0].category.children,
    });

  };

  render() {
    const { error, categories, itemsLoaded, name, subcategories, categoryParent, categoryChild, measures, price, description } = this.state;
    const { newItemCreated, newItem } = this.props;
    const item = {
      name: name,
      category_id: categoryChild,
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
                  id="label_category_parent"
                  name="categoryParent"
                  value={categoryParent}
                  onChange={this.handleCategoryChange}
                >
                  <option value="" disabled="">Выберите категорию товара</option>
                  {
                    categories.map( (item, idx) => {
                      return (
                        <option value={item.category.id} key={idx}>{item.category.name}</option>
                      );
                    })
                  }
                </select>
                <select
                  id="label_category_child"
                  name="categoryChild"
                  value={categoryChild}
                  onChange={this.handleChange}
                >
                  <option value="" disabled="">Выберите подкатегорию товара</option>
                  {
                    subcategories.map( (item, idx) => {
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