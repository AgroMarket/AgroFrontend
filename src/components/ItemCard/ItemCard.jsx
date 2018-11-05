import './ItemCard.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {serverAddress} from '../../constants';

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
      // единица измерения товара
      measures: PropTypes.string,
      // цена товара
      price: PropTypes.number,
    }),
  };

  render() {
    // получаем переданные свойства товара каталога
    const { item, itemHandle } = this.props;
    return (
      <Card className="catalogitem">
        <CardActionArea
          onClick={event => itemHandle(event, item.id)}
        >
          <CardMedia
            component="img"
            alt={item.title}
            height="160"
            image={serverAddress+item.image}
            title={item.title}
          />
          <CardContent className="description">
            <Typography gutterBottom component="p" className="title">
              {item.title}
            </Typography>
            <Typography gutterBottom component="p" className="price">
              {item.price} руб.&nbsp;/&nbsp;{item.measures}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}