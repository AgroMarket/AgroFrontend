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
            title={item.name}
          />
          <CardContent>
            <Typography gutterBottom component="p">
              {item.name}
            </Typography>
            <Typography gutterBottom variant="h2" component="p">
              100
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}