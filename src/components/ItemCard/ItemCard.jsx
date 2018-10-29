import './ItemCard.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// TODO загрузка изображения должна быть с сервера
import CatalogItemPhoto from 'img/CatalogItem.jpg';

/**
 * Класс ItemCard - компонент, отображающий карточку товара на странице
 */
export default class ItemCard extends PureComponent {
  // Проверка свойств
  static propTypes = {
    // Описание товара - массив объектов
    item: PropTypes.shape({
      // название товара
      title: PropTypes.string,
      // количество товара за предлагаемую цену
      quantity: PropTypes.number,
      // единица измерения товара
      measures: PropTypes.string,
      // цена товара
      price: PropTypes.number,
    }),
  };

  render() {
    // получаем переданные свойства товара каталога
    const { item } = this.props;
    return (
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            src={CatalogItemPhoto}
            title={item.title}
          />
          <CardContent>
            <Typography gutterBottom component="p">
              {item.title}
            </Typography>
            <Typography gutterBottom variant="h5" component="p">
              {item.quantity} {item.measures} / {item.price} руб.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}