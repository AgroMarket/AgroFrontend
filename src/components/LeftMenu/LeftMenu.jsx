import './LeftMenu.scss';

import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

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

  /**
   * Устанавливает выбранный пользователем раздел каталога в качестве текущего открытого и передает его номер в MainPage
   * @param event обрабатываемое событие щелчка по разделу каталога
   * @param index номер выбранного пользователем раздела каталога
   */
  handleListItemClick = (event, index) => {
    this.setState({
      section: index,
    });
    this.props.section(index);
  };

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
      <List component="nav" className="leftmenu">
        {menu.map( (item, idx) => {
          return (
            <Fragment key={idx}>
              <ListItem
                button
                selected={this.state.section === idx}
                onClick={event => this.handleListItemClick(event, idx)}
                className="catalogmenuitem"
              >
                <ListItemText primary={item.name}/>
              </ListItem>
              <Divider />
            </Fragment>
          );
        })}
      </List>
    );
  }
}