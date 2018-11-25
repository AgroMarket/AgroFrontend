import './SellerItems.scss';

import React, { PureComponent } from 'react';
import MyOrdersIcon from '@material-ui/icons/DateRange';
import Button from '@material-ui/core/Button/Button';
import PropTypes from 'prop-types';

import SellerItem from 'components/SellerItem';
import {serverAddress} from 'constants/ServerAddress';

// Данные для кнопки Добавить объявление
const newSellButton = {
  id: 'sell_item',
  name: 'Добавить товар',
};

/**
 * Класс SellerItems - компонент, отображающий список продаваемых товаров на странице продавца
 */
export default class SellerItems extends PureComponent {
  constructor(props) {
    super(props);
    
    // значения полей, используемых в render()
    this.state = {
      sellerItems: {},
      itemsLoaded: false,
    };
  }

  // Проверка свойств
  static propTypes = {
    // Функция отображения формы редактирования или создания товара
    itemHandle: PropTypes.func,
    jwtToken: PropTypes.string,
    getID: PropTypes.func,
    id: PropTypes.number,
  };

  componentDidMount() {
    const {jwtToken} = this.props;
    fetch(`${serverAddress}/api/producer/products`, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        this.setState(
          prevState => {
            return {
              ...prevState,
              sellerItems: res.result,
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

  // обработка щелчков по кнопке Удалить товар
  handleDeleteItem = (item_number, item_id) => {
    fetch(`${serverAddress}/api/producer/products/${item_id}`, {
      method: 'delete',
    })
      .then(() => {
        const newSellerItems = Object.assign({}, this.state.sellerItems);
        newSellerItems.products.splice(item_number, 1);
        this.setState(
          prevState => {
            return {
              ...prevState,
              sellerItems: newSellerItems,
            };
          }
        );
      });
  };

  render() {
    const { error, sellerItems, itemsLoaded } = this.state;
    const { itemHandle, getID } = this.props;

    if (error) {
      return <p>Ошибка: {error.message}</p>;
    }
    else
      if (!itemsLoaded) {
        return <p className="load_info">Пожалуйста, подождите, идет загрузка страницы</p>;
      }
      else {
        let content;
        if (sellerItems === undefined || sellerItems.length === 0 || sellerItems.products === undefined || sellerItems.products.length === 0) {
          content = <div className="load_info">
            <div/>
            <p>Вы можете добавить товары на продажу с помощью кнопки {newSellButton.name}</p>
          </div>;
        }
        else
          content = sellerItems.products.map((item, idx) => {
            return (
              <SellerItem
                item={item}
                key={idx}
                itemNumber={idx}
                itemHandle={itemHandle}
                getID={getID}
                handleDeleteItem={this.handleDeleteItem}
              />
            );
          });
        return (
          <div className="seller_items">
            <div className="seller_items_header">
              <MyOrdersIcon className="my_orders_icon"/>
              <h2>Товары, выставленные на продажу</h2>
            </div>
            <p>
              <Button
                className="sell_button"
                variant="contained"
                color="primary"
                id={newSellButton.id}
                onClick={() => itemHandle('new_product')}
              >
                {newSellButton.name}
              </Button>
            </p>
            {content}
          </div>
        );
      }
  }
}