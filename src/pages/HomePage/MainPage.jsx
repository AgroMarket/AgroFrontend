import './MainPage.scss';

import React, { PureComponent } from 'react';
import LeftMenu from 'components/LeftMenu';
import SearchForm from 'components/SearchForm';
import CatalogList from 'components/CatalogList';
import {serverAddress} from '../../constants';

/**
 * Класс HomePage - компонент, отображающий главную страницу
 */
export default class MainPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // пункты меню каталога
      menuItems: [],
      // состояние загрузки пунктов меню каталога
      menuLoaded: false,
      // при входе на страницу ни один из разделов каталога не выбран, загружается случайный набор товаров
      openedSection: '/startlist',
      // ошибка загрузки
      error: null,
    };
  }

  componentDidMount() {
    fetch(`${serverAddress}/api/catalogmenu`)
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

  /**
   * Получает из LeftMenu и сохраняет в state адрес текущего открытого раздела каталога товаров
   * @param sectionNumber выбранный пользователем раздел каталога товаров
   */
  changeSection = sectionNumber => {
    this.setState({openedSection: this.state.menuItems[sectionNumber].path});
  };

  render() {
    const { error, menuLoaded, menuItems, openedSection } = this.state;
    if (error) {
      return <p>Ошибка: {error.message}</p>;
    }
    else
    // Отображаем main
      if (!menuLoaded) {
        return <p>Пожалуйста, подождите, идет загрузка страницы</p>;
      }
      else {
        return (
          <main>
            <div/>
            <LeftMenu menu={menuItems} section={this.changeSection} className="left_menu"/>
            <div>
              <SearchForm onSend={this.handleItemSearch}/>
              <CatalogList section={openedSection}/>
            </div>
            <div/>
          </main>
        );
      }
  }
}