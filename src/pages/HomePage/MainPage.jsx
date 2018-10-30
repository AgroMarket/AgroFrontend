import './MainPage.scss';

import React, { PureComponent } from 'react';
import LeftMenu from 'components/LeftMenu';
import SearchForm from 'components/SearchForm';
import CatalogList from 'components/CatalogList';
// TODO удалить mock.json
import startListData from 'mocks/startlist.json';
import catalogMenuData from 'mocks/catalogmenu.json';

/**
 * Класс HomePage - компонент, отображающий главную страницу
 */
export default class MainPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // пункты меню каталога
      menuItems: [],
      // товары каталога
      catalogItems: [],
      // состояние загрузки пунктов меню каталога
      menuLoaded: false,
      // состояние загрузки товаров каталога
      itemsLoaded: false,
      // ошибка загрузки
      error: null,
    };
  }

  componentDidMount() {
    // TODO включить прием данных с сервера
/*    fetch('http://80.211.153.183:3000/api/catalogmenu')
      .then(res => res.json())
      .then(res => {
        this.setState({menuItems: res});
        this.setState({menuLoaded: true});
        },
      error => {
        this.setState({
          menuLoaded: true,
          error,
        });
      });

      fetch('http://80.211.153.183:3000/api/startlist')
      .then(res => res.json())
      .then(res => {
        this.setState({catalogItems: res});
        this.setState({itemsLoaded: true});
        },
      error => {
        this.setState({
          itemsLoaded: true,
          error,
        });
      });*/
    // TODO удалить mock.json
    this.setState({menuItems: catalogMenuData});
    this.setState({menuLoaded: true});
    this.setState({catalogItems: startListData});
    this.setState({itemsLoaded: true});
  }

  handleItemSearch = items => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          // возвращаем массив найденных товаров
          catalogItems: items,
        };
      }
    );
  };

  render() {
    const { error, itemsLoaded, menuLoaded, menuItems, catalogItems } = this.state;
    if (error) {
      return <p>Ошибка: {error.message}</p>;
    }
    else
    // Отображаем main
      if (!itemsLoaded || !menuLoaded) {
        return <p>Пожалуйста, подождите, идет загрузка страницы</p>;
      }
      else {
        return (
          <main>
            <div/>
            <LeftMenu menu={menuItems} className="left_menu"/>
            <div>
              <SearchForm onSend={this.handleItemSearch}/>
              <CatalogList items={catalogItems}/>
            </div>
            <div/>
          </main>
        );
      }
  }
}