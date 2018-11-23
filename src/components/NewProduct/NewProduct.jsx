import './NewProduct.scss';

import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button/Button';
import MyOrdersIcon from '@material-ui/icons/DateRange';

import {serverAddress} from 'constants/ServerAddress';

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
      category: [],
      itemsLoaded: false,
      error: null,
    };
  }

  componentDidMount() {
    fetch(`${serverAddress}/api/categories`)
      .then(res => res.json())
      .then(res => {
          this.setState(
            prevState => {
              return {
                ...prevState,
                category: res.result,
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

  render() {
    const { error, category, itemsLoaded } = this.state;

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
          <div className="seller_profile">
            <div className="left_item_parameters">
              <input type="text" id="label_name" name="item_name" placeholder=' '/>
              <label className="item_name" htmlFor="label_name">Название товара</label>
              <select id="label_category" name="item_category">
                <option value="" disabled="">Выберите категорию товара</option>
                {
                  category.categories.map( (item, idx) => {
                    return (
                      <option value={item.category.id} key={idx}>{item.category.name}</option>
                    );
                  })
                }
              </select>
              <label className="item_category" htmlFor="label_category">Категория товара</label>
              <input type="text" id="label_measures" name="item_measures" placeholder=' '/>
              <label className="item_measures" htmlFor="label_measures">Единицы измерения</label>
              <input type="text" id="label_price" name="item_price" placeholder=' '/>
              <label className="item_price" htmlFor="label_price">Цена</label>
            </div>
            <div className="right_item_parameters">
              <input type="text" id="label_description" name="item_description" placeholder=' '/>
              <label className="item_description" htmlFor="label_description">Описание, состав, энергетическая ценность</label>
            </div>
            <Button
              className="load_item_photo"
              variant="text"
              color="primary"
              id={loadItemPhotoButton.id}
            >
              {loadItemPhotoButton.name}
            </Button>
            <Button
              className="save_item"
              variant="contained"
              color="primary"
              id={saveItemButton.id}
            >
              {saveItemButton.name}
            </Button>
          </div>
        </div>
      );
  }
}