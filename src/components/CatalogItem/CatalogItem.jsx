import './CatalogItem.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';

import {serverAddress} from 'constants/ServerAddress';

// Данные для кнопки Добавить в корзину
const addToBasketButton = {id: 'addItemToBasket', name: 'Добавить в корзину'};
// Данные для кнопки Назад
const backButton = {id: 'back', name: 'Назад'};

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
      // количество приобретаемого товара
      itemCounter: 1,
      // флаг отображения информации об отправке товара в корзину
      showInfo: false,
    };
  }

  // Проверка свойств
  static propTypes = {
    // Адрес для просмотра информации о товаре каталога
    item: PropTypes.string,
    // Функция возврата в каталог из просмотра информации о товаре каталога
    actionBack: PropTypes.func,
    // ID корзины на сервере
    basketID: PropTypes.string,
    producerHandle: PropTypes.func,
  };

  // значения атрибутов по умолчанию
  static defaultProps = {
    // аттрибут items инициализируем пустой строкой
    item: '',
  };

  componentDidMount() {
    fetch(`${serverAddress}${this.props.item}`)
      .then(res => res.json())
      .then(res => {
          this.setState(
            prevState => {
              return {
                ...prevState,
                catalogItem: res.result,
                itemLoaded: true,
              };
            }
          );
        },
        error => {
          this.setState({
            itemLoaded: true,
            error,
          });
        });
  }

  // обработка щелчков по кнопке добавить количество товара
  handleAddClick = () => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          itemCounter: this.state.itemCounter+1,
        };
      }
    );
  };

  // обработка щелчков по кнопке уменьшить количество товара
  handleRemoveClick = () => {
    if (this.state.itemCounter > 1) {
      this.setState(
        prevState => {
          return {
            ...prevState,
            itemCounter: this.state.itemCounter - 1,
          };
        }
      );
    }
  };

  // обработка щелчков по кнопке Добавить в корзину
  handleAddToBasketClick = () => {
    const itemJSON = JSON.stringify({
      'cart_item':
        {
          'product_id': this.state.catalogItem.product.id,
          'quantity': this.state.itemCounter,
        },
    });
    fetch(`${serverAddress}/api/carts/${this.props.basketID}/cart_items`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: itemJSON,
    })
      .then(
        () => {
          this.setState(
            prevState => {
              return {
                ...prevState,
                showInfo: true,
              };
            }
          );
        }
      );
  };

  render() {
    // получаем переданные свойства товаров каталога
    const { error, itemLoaded, catalogItem, itemCounter } = this.state;
    const { actionBack, producerHandle } = this.props;
    if (error) {
      return <p>Ошибка: {error.message}</p>;
    }
    else
      if (!itemLoaded) {
        return <p className="load_info">Пожалуйста, подождите, идет загрузка страницы</p>;
      }
      else {
        return (
          <div className="catalog_item">
            <div className="left_info">
              <h2 className="item_title">{catalogItem.product.title}</h2>
              <p className="item_description">{catalogItem.product.descripion}</p>
              <p className="item_seller"
                 onClick={event => producerHandle(event, catalogItem.product.producer_id)}
              >Производитель: {catalogItem.product.producer_name}</p>
            </div>
            <div className="right_info">
              <img src={serverAddress+catalogItem.product.image} alt={catalogItem.product.image}/>
              <p>
                <Button
                  className="remove_button"
                  variant="fab"
                  mini
                  color="secondary"
                  aria-label="Remove"
                  onClick={this.handleRemoveClick}
                >
                  <RemoveIcon />
                </Button>
                <span className="item_counter">{itemCounter}</span>
                <Button
                  className="add_button"
                  variant="fab"
                  mini
                  color="secondary"
                  aria-label="Add"
                  onClick={this.handleAddClick}
                >
                  <AddIcon />
                </Button>
                <span className="item_price">
                  {catalogItem.product.price} руб. / 1 {catalogItem.product.measures}
                </span>
                </p>
              <Button
                className="add_to_basket_button"
                variant="contained"
                color="primary"
                id={addToBasketButton.id}
                onClick={this.handleAddToBasketClick}
              >
                  {addToBasketButton.name}
              </Button>
            </div>
            <div>
              <div className="back_button">
                <Button
                  color="primary"
                  id={backButton.id}
                  onClick={() => actionBack()}
                >
                  {backButton.name}
                </Button>
              </div>
            </div>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              open={this.state.showInfo}
              autoHideDuration={6000}
              TransitionComponent={Fade}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">Товар отправлен в корзину</span>}
            />
          </div>
        );
      }
  }
}