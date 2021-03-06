import './LeftMenu.scss';

import React, { PureComponent} from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {serverAddress} from 'constants/ServerAddress';

/**
 * Класс LeftMenu - компонент, отображающий разделы каталога на странице каталога
 */
export default class LeftMenu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // при входе на страницу ни один из разделов каталога не выбран
      section: -1,
    };
  }

  // Проверка свойств
  static propTypes = {
    // Пункты меню - массив объектов
    menu: PropTypes.arrayOf(PropTypes.shape({
      // id пункта
      id:  PropTypes.number,
      // название пункта
      name: PropTypes.string,
      // адрес
      path: PropTypes.string,
    })),
    // функция обратного вызова в родительский компонент
    section: PropTypes.func,
    searchResults: PropTypes.bool,
  };

  componentDidUpdate(prevProps) {
    if (this.props.searchResults !== prevProps.searchResults)
      if (this.props.searchResults)
        this.setState(
          prevState => {
            return {
              ...prevState,
              section: -1,
            };
          }
        );
  }

  // значения атрибутов по умолчанию
  static defaultProps = {
    // аттрибут menu инициализируем пустым массивом
    menu: [],
  };

  /**
   * Устанавливает выбранный пользователем раздел каталога в качестве текущего открытого и передает его номер в MainPage
   * @param event обрабатываемое событие щелчка по разделу каталога
   * @param index номер выбранного пользователем раздела каталога
   * @param id, с которым выбранный пользователем раздел каталога хранится на сервере
   */
  handleListItemClick = (event, index, id) => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          section: index,
        };
      }
    );
    this.props.section(id);
  };

  render() {
    // получаем переданные свойства меню
    const { menu } = this.props;
    return (
      <List component="nav" className="leftMenu">
        {menu.map( (item, idx) => {
          return (
            <ListItem key={idx}
              button
              selected={this.state.section === idx}
              onClick={event => this.handleListItemClick(event, idx, item.category.id)}
              className="catalogMenuItem"
            >
              <span className="categoryIcon"><img src={serverAddress+item.category.icon} alt={item.category.name}/></span>
              <ListItemText primary={item.category.name}/>
            </ListItem>
          );
        })}
      </List>
    );
  }
}