import './SellerMenu.scss';

import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {serverAddress} from 'constants/ServerAddress';

/**
 * Класс SellerMenu - компонент, отображающий меню продавца на странице
 */
export default class SellerMenu extends PureComponent {
  constructor(props) {
    super(props);
    
    // значения полей, используемых в render()
    this.state = {
      // при входе на страницу ни один из выбран раздел с товарами продавца
      section: 0,
    };
  }

  /**
   * Устанавливает выбранный пользователем раздел каталога в качестве текущего открытого и передает его номер в MainPage
   * @param event обрабатываемое событие щелчка по разделу каталога
   * @param index номер выбранного пользователем раздела каталога   *
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

  // Проверка свойств
  static propTypes = {
    // Пункты меню - массив объектов
    menu: PropTypes.arrayOf(PropTypes.shape({
      // id пункта
      id:  PropTypes.string,
      // название пункта
      title: PropTypes.string,
      // адрес
      component: PropTypes.string,
    })),
    // функция обратного вызова в родительский компонент
    section: PropTypes.func,
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
      <List component="nav" className="sellerMenu">
        {menu.map( (item, idx) => {
          return (
            <Fragment key={idx}>
              <ListItem
                button
                selected={this.state.section === idx}
                onClick={event => this.handleListItemClick(event, idx, item.id)}
                className="catalogMenuItem"
              >
                <img src={serverAddress+item.icon} alt={item.name} className="categoryIcon"/>
                <ListItemText primary={item.name}/>
              </ListItem>
            </Fragment>
          );
        })}
      </List>
    );
  }
}