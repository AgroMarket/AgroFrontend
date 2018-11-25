import './BasketFinish.scss';

import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button/Button';
import {Link} from 'react-router-dom';

const linkToMain = props => <Link to="/" {...props}/>;
// Данные для кнопки Перейти в каталог
const gotoCatalogButton = {id: 'gotoCatalogButton', name: 'Вернуться к покупкам'};

/**
 * Класс BasketFinish - компонент, отображающий отправку заказа на странице Корзина
 */
export default class BasketFinish extends PureComponent {
  render() {
    return (
      <div className="basket_finish">
        <p>Ваш заказ успешно оформлен</p>
        <Button
          className="goto_catalog"
          variant="contained"
          color="primary"
          component={linkToMain}
          to="/"
          id={gotoCatalogButton.id}
          onClick={this.handleAddToBasketClick}
          {...this.props}
        >
          {gotoCatalogButton.name}
        </Button>
      </div>
    );
  }
}