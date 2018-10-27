import './MainPage.scss';

import React, { PureComponent } from 'react';
import LeftMenu from 'components/LeftMenu';
import SearchForm from 'components/SearchForm';

// Список пунктов меню
const menu = [
  // Главная (стартовая) страница Ferma Store
  {
    id: '1',
    name: 'item1',
    path: '/item1',
  },
  {
    id: '2',
    name: 'item2',
    path: '/item2',
  },
  {
    id: '3',
    name: 'item3',
    path: '/item3',
  },
  {
    id: '4',
    name: 'item4',
    path: '/item4',
  },
  {
    id: '5',
    name: 'item5',
    path: '/item5',
  },
  {
    id: '6',
    name: 'item6',
    path: '/item6',
  },
  {
    id: '7',
    name: 'item7',
    path: '/item7',
  },
  {
    id: '8',
    name: 'item8',
    path: '/item8',
  },
  {
    id: '9',
    name: 'item9',
    path: '/item9',
  },
  {
    id: '10',
    name: 'item10',
    path: '/item10',
  },
  {
    id: '11',
    name: 'item11',
    path: '/item11',
  },
  {
    id: '12',
    name: 'item12',
    path: '/item12',
  },
];

/**
 * Класс HomePage - компонент, отображающий главную страницу
 */
export default class MainPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  handleItemSearch = item => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          // перезаписываем содержимое всего массива комментариев новым массивом, содержащим все комментарии старого массива и новый комментарий
          items: prevState.comments.concat([item]),
        };
      }
    );
  };

  render() {
    // Отображаем main
    return (
      <main>
        <div></div>
        <LeftMenu menu={menu} className="left_menu"/>
        <SearchForm onSend={this.handleItemSearch}/>
      </main>
    );
  }
}