import './MainPage.scss';

import React, { PureComponent } from 'react';
import LeftMenu from 'components/LeftMenu';
import SearchForm from 'components/SearchForm';
import CatalogList from 'components/CatalogList';
import CatalogItem from 'components/CatalogItem';
import CatalogProducer from 'components/CatalogProducer';
import {serverAddress} from 'constants/ServerAddress';
import PropTypes from 'prop-types';

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
      // адрес производителя
      openedProducer: '',
      // ошибка загрузки
      error: null,
      // TODO добавить пагинацию для вывода товаров каталога
      // флаг включения пагинации on / off
      pagination: 'off',
      // режим отображения catalogList / catalogItem
      mode: 'catalogList',
      searchResults: false,
    };
  }

  // Проверка свойств
  static propTypes = {
    // ID корзины на сервере
    basketID: PropTypes.string,
  };

  componentDidMount() {
    fetch(`${serverAddress}/api/categories`)
      .then(res => res.json())
      .then(res => {
        this.setState(
          prevState => {
            return {
              ...prevState,
              menuItems: res.result.categories,
              menuLoaded: true,
            };
          }
        );
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
          searchResults: true,
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
          searchResults: false,
        };
      }
    );
  };

  // Пользователь открывает карточку товара
  itemHandle = itemID => {
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

  // Пользователь открывает описание производителя
  producerHandle = producerID => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          openedProducer: `/api/producers/${producerID}`,
          // переходим в режим отображения Описания производителя
          mode: 'catalogProducer',
        };
      }
    );
  };

  // Пользователь возвращается в каталог из просмотра карточки товара
  closeItem = () => {
    if (this.state.mode === 'catalogItem') {
      this.setState(
        prevState => {
          return {
            ...prevState,
            openedItem: '',
            // переходим в режим отображения Каталога товаров
            mode: 'catalogList',
          };
        }
      );
    }
    else {
      this.setState(
        prevState => {
          return {
            ...prevState,
            openedProducer: '',
            // переходим в режим отображения Карточки товара
            mode: 'catalogItem',
          };
        }
      );
    }
  };

  render() {
    const { error, menuLoaded, menuItems, openedSection, mode, openedItem, searchResults, openedProducer } = this.state;
    const { basketID } = this.props;
    if (error) {
      return <p>Ошибка: {error.message}</p>;
    }
    else
      if (!menuLoaded) {
        return <p className="load_info">Пожалуйста, подождите, идет загрузка страницы</p>;
      }
      else {
        let content;
        if (mode === 'catalogList') {
          content = <CatalogList section={openedSection} itemHandle={this.itemHandle}/>;
        }
        if (mode === 'catalogItem') {
          content = <CatalogItem item={openedItem} actionBack={this.closeItem} producerHandle={this.producerHandle} basketID={basketID}/>;
        }
        if (mode === 'catalogProducer') {
          content = <CatalogProducer producerLink={openedProducer} actionBack={this.closeItem} basketID={basketID}/>;
        }
        return (
          <div className="main_page">
            <div/>
            <LeftMenu
              menu={menuItems}
              section={this.changeSection}
              className="left_menu"
              searchResults={searchResults}
            />
            <div>
              <SearchForm onSend={this.handleItemSearch}/>
              {content}
            </div>
            <div/>
          </div>
        );
      }
  }
}