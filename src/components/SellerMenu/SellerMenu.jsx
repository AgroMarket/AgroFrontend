import './SellerMenu.scss';

import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MyOrdersIcon from '@material-ui/icons/DateRange';

const menuItems = [
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
    name: 'Мои клиенты',
    component: 'SellerClients',
    icon: MyOrdersIcon,
  },
  {
    id: 'seller_profile',
    name: 'Мой профиль',
    component: 'SellerProfile',
    icon: MyOrdersIcon,
  },
];

/**
 * Класс SellerMenu - компонент, отображающий меню продавца на странице
 */
export default class SellerMenu extends PureComponent {
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

  // Проверка свойств
  static propTypes = {
    // функция обратного вызова в родительский компонент
    section: PropTypes.func,
  };

  render() {
    // получаем переданные свойства меню
    const { menuItems } = this.state;
    return (
      <List component="nav" className="sellerMenu">
        {menuItems.map( (item, idx) => {
          return (
            <Fragment key={idx}>
              <ListItem
                button
                selected={this.state.section === idx}
                onClick={event => this.handleListItemClick(event, idx, item.id)}
                className="catalogMenuItem"
              >
                <MyOrdersIcon/>
                <ListItemText primary={item.name}/>
              </ListItem>
            </Fragment>
          );
        })}
      </List>
    );
  }
}