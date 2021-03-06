import './ProfileMenu.scss';

import React, { PureComponent} from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MyOrdersIcon from '@material-ui/icons/DateRange';

import { menuItems } from 'constants/ProfileMenuItems';
import { buyer, seller, admin, delivery } from 'constants/AuthorizationTypes';

/**
 * Класс ProfileMenu - компонент, отображающий меню продавца на странице
 */
export default class ProfileMenu extends PureComponent {
  constructor(props) {
    super(props);
    
    // значения полей, используемых в render()
    this.state = {
      // при входе на страницу ни один из выбран раздел с товарами продавца
      section: 0,
    };
  }

  // Проверка свойств
  static propTypes = {
    // функции обратного вызова в родительский компонент
    section: PropTypes.func,
    handleLogout: PropTypes.func,
    // авторизация пользователя
    userStatus: PropTypes.string,
  };

  /**
   * Устанавливает выбранный пользователем раздел каталога в качестве текущего открытого и передает его номер в MainPage
   * @param event обрабатываемое событие щелчка по разделу каталога
   * @param index номер выбранного пользователем раздела каталога
   * @param id, с которым выбранный пользователем раздел каталога хранится на сервере
   */
  handleListItemClick = (event, index, id) => {
    if (id !== 'seller_quit') {
      this.setState(
        prevState => {
          return {
            ...prevState,
            section: index,
          };
        }
      );
      this.props.section(id);
    } else {
      this.props.handleLogout();
    }
  };

  render() {
    const { userStatus } = this.props;
    let content = menuItems.map( (item, idx) => {
      return (
        <ListItem key={idx}
                  button
                  selected={this.state.section === idx}
                  onClick={event => this.handleListItemClick(event, idx, item.id)}
                  className="catalogMenuItem"
        >
          <MyOrdersIcon/>
          <ListItemText primary={item.name}/>
        </ListItem>
      );
    });
    // разделы меню для покупателей
    if (userStatus === buyer) {
      content.splice(3, 5);
    }
    // разделы меню для администрации FermaStore
    if (userStatus === admin) {
      content.splice(1, 5);
      content.splice(2, 1);
    }
    // разделы меню для службы доставки
    if (userStatus === delivery) {
      content.splice(1, 6);
    }
    // разделы меню для продавцов
    if (userStatus === seller) {
      content.splice(7, 1);
    }
    return (
      <List component="nav" className="sellerMenu">
        {content}
      </List>
    );
  }
}