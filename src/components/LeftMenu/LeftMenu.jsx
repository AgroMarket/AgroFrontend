import './LeftMenu.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

/**
 * Класс LeftMenu - компонент, отображающий разделы каталога на странице каталога
 */
export default class LeftMenu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // при входе на страницу ни один из разделов каталога не выбран
      selectedIndex: -1,
    };
  }

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  // Проверка свойств
  static propTypes = {
    // Пункты меню - массив объектов
    menu: PropTypes.arrayOf(PropTypes.shape({
      // id пункта
      id:  PropTypes.string,
      // название пункта
      name: PropTypes.string,
      // адрес
      path: PropTypes.string,
    })),
  };

  // значения атрибутов по умолчанию
  static defaultProps = {
    // аттрибут menu инициализируем пустым массивом
    menu: [],
  };

  render() {
    // получаем переданные свойства меню
    const { menu } = this.props;
    return (
      <List component="nav">
        {menu.map( (item, idx) => {
          return (
            <ListItem
              button
              selected={this.state.selectedIndex === idx}
              onClick={event => this.handleListItemClick(event, idx)}
              key={idx}
            >
              <ListItemText primary={item.name}/>
            </ListItem>
          );
        })}
      </List>
    );
  }
}