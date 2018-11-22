import './ProfileMenu.scss';

import React, { PureComponent} from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MyOrdersIcon from '@material-ui/icons/DateRange';

const menuItems = [
  {
    id: 'profile_purchase',
    name: 'Мои покупки',
    component: 'ProfilePurchase',
    icon: MyOrdersIcon,
  },
  {
    id: 'profile_sellers',
    name: 'Мои поставщики',
    component: 'ProfileSellers',
    icon: MyOrdersIcon,
  },
  {
    id: 'seller_items',
    name: 'Мой прилавок',
    component: 'SellerItems',
    icon: MyOrdersIcon,
  },
  {
    id: 'seller_sells',
    name: 'Мои продажи',
    component: 'SellerSells',
    icon: MyOrdersIcon,
  },
  {
    id: 'seller_clients',
    name: 'Мои покупатели',
    component: 'SellerClients',
    icon: MyOrdersIcon,
  },
  {
    id: 'seller_profile',
    name: 'Мой профиль',
    component: 'SellerProfile',
    icon: MyOrdersIcon,
  },
  {
    id: 'seller_quit',
    name: 'Выйти',
    icon: MyOrdersIcon,
  },
];

/**
 * Класс ProfileMenu - компонент, отображающий меню продавца на странице
 */
export default class ProfileMenu extends PureComponent {
  constructor(props) {
    super(props);
    
    // значения полей, используемых в render()
    this.state = {
      // пункты меню продавца
      menuItems: menuItems,
      // при входе на страницу ни один из выбран раздел с товарами продавца
      section: 0,
    };
  }

  // Проверка свойств
  static propTypes = {
    // функции обратного вызова в родительский компонент
    section: PropTypes.func,
    handleLogout: PropTypes.func,
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
    // получаем переданные свойства меню
    const { menuItems } = this.state;
    return (
      <List component="nav" className="sellerMenu">
        {menuItems.map( (item, idx) => {
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
        })}
      </List>
    );
  }
}