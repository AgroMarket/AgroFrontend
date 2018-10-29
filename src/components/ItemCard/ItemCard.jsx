import './ItemCard.scss';

import React, { PureComponent } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CatalogItemPhoto from '../../imgs/CatalogItem.jpg';

/**
 * Класс ItemCard - компонент, отображающий карточку товара на странице
 */
export default class ItemCard extends PureComponent {
  constructor(props) {
    super(props);

    // значения полей, используемых в render()
    this.state = {

    };
  }

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