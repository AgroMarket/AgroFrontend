import './MainPage.scss';

import React, { PureComponent } from 'react';
import LeftMenu from 'components/LeftMenu';
import SearchForm from 'components/SearchForm';
import CatalogList from 'components/CatalogList';
// TODO удалить mock.json
import startListData from 'mocks/startlist.json';

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
      isLoaded: false,
      error: null,
    };
  }

  componentDidMount() {
    // TODO включить прием данных с сервера
/*    fetch('http://80.211.153.183:3000/api/startlist')
      .then(res => res.json())
      .then(res => {
        this.setState({items: res});
        this.setState({isLoaded: true});
        },
      error => {
        this.setState({
          isLoaded: true,
          error,
        });
      });*/
    // TODO удалить mock.json
    this.setState({items: startListData});
    this.setState({isLoaded: true});
  }

  handleItemSearch = items => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          // возвращаем массив найденных товаров
          items: items,
        };
      }
    );
  };

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <p>Ошибка: {error.message}</p>;
    }
    else
    // Отображаем main
      if (!isLoaded) {
        return <p>Пожалуйста, подождите, идет загрузка страницы</p>;
      }
      else {
        return (
          <main>
            <div/>
            <LeftMenu menu={menu} className="left_menu"/>
            <div>
              <SearchForm onSend={this.handleItemSearch}/>
              <CatalogList items={items}/>
            </div>
            <div/>
          </main>
        );
      }
  }
}