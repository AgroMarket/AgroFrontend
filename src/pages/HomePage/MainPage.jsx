import './MainPage.scss';

import React, { PureComponent } from 'react';
import LeftMenu from 'components/LeftMenu';
import SearchForm from 'components/SearchForm';
import CatalogList from 'components/CatalogList';
import CatalogItem from 'components/CatalogItem';
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
      openedSection: '/api/products?scope=samples',
      // адрес открытого товара каталога
      openedItem: '',
      // ошибка загрузки
      error: null,
      // флаг включения пагинации on / off
      pagination: 'off',
      // режим отображения catalogList / catalogItem
      mode: 'catalogList',
    };
  }

  componentDidMount() {
    fetch(`${serverAddress}/api/categories`)
      .then(res => res.json())
      .then(res => {
        this.setState({menuItems: res.result});
        this.setState({menuLoaded: true});
        },
      error => {
        this.setState({
          menuLoaded: true,
          error,
        });
      });
  }

  handleItemSearch = template => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          // загружаем найденные товары
          openedSection: `/api/products?search=${template.item}`,
          // переходим в режим отображения Каталог товаров
          mode: 'catalogList',
        };
      }
    );
  };

  /**
   * Получает из LeftMenu и сохраняет в state адрес текущего открытого раздела каталога товаров
   * @param sectionID id выбранного пользователем раздела каталога товаров
   */
  changeSection = sectionID => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          openedSection: `/api/categories/${sectionID}/products`,
          // переходим в режим отображения Каталог товаров
          mode: 'catalogList',
        };
      }
    );
  };

  // Пользователь открывает карточку товара
  openItem = (event, itemID) => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          openedItem: `/api/products/${itemID}`,
          // переходим в режим отображения Карточки товара
          mode: 'catalogItem',
        };
      }
    );
  };

  render() {
    const { error, menuLoaded, menuItems, openedSection, mode, openedItem } = this.state;
    if (error) {
      return <p>Ошибка: {error.message}</p>;
    }
    else
    // Отображаем main
      if (!menuLoaded) {
        return <p>Пожалуйста, подождите, идет загрузка страницы</p>;
      }
      else {
        let content;
        if (mode === 'catalogList') {
          content = <CatalogList section={openedSection} itemHandle={this.openItem}/>;
        }
        if (mode === 'catalogItem') {
          content = <CatalogItem item={openedItem}/>;
        }
        return (
          <main>
            <div/>
            <LeftMenu menu={menuItems} section={this.changeSection} className="left_menu"/>
            <div>
              <SearchForm onSend={this.handleItemSearch}/>
              {content}
            </div>
            <div/>
          </main>
        );
      }
  }
}