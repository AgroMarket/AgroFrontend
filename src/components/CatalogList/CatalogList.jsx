import './CatalogList.scss';

import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import ItemCard from 'components/ItemCard';
import IconButton from '@material-ui/core/IconButton';
import FirstPage from '@material-ui/icons/FirstPage';
import PrevPage from '@material-ui/icons/ChevronLeft';
import NextPage from '@material-ui/icons/ChevronRight';
import LastPage from '@material-ui/icons/LastPage';

import {serverAddress} from 'constants/ServerAddress';

/**
 * Класс CatalogList - компонент, отображающий товары каталога на странице
 */
export default class CatalogList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // товары каталога
      catalogItems: [],
      // состояние загрузки товаров каталога
      itemsLoaded: false,
      // ошибка загрузки
      error: null,
      // текущая страница
      currentPage: 1,
      // последняя страница
      lastPage: 1,
      firstPageEnable: false,
      prevPageEnable: false,
      nextPageEnable: false,
      lastPageEnable: false,
    };
  }

  // Проверка свойств
  static propTypes = {
    // Пункты меню - массив объектов
    items: PropTypes.arrayOf(PropTypes.shape({
      // название товара
      title: PropTypes.string,
      // единица измерения товара
      measures: PropTypes.string,
      // цена товара
      price: PropTypes.number,
    })),
    // Путь в адресной строке
    section: PropTypes.string,
    // Функция отображения информации о товаре
    itemHandle: PropTypes.func,
    pagination: PropTypes.bool,
  };

  // значения атрибутов по умолчанию
  static defaultProps = {
    // аттрибут items инициализируем пустым массивом
    items: [],
  };

  componentDidMount() {
    const {pagination} = this.props;
    let page = '';
    if (pagination)
      page = 'page=1';
    fetch(`${serverAddress}${this.props.section}${page}`)
      .then(res => res.json())
      .then(res => {
          if (pagination) {
            const lastPage = res.result.pagination.last_page;
            this.setState(
              prevState => {
                return {
                  ...prevState,
                  lastPage: lastPage,
                  nextPageEnable: lastPage > 1,
                  lastPageEnable: lastPage > 1,
                };
              }
            );
          }
          this.setState(
            prevState => {
              return {
                ...prevState,
                catalogItems: res.result,
                itemsLoaded: true,
              };
            }
          );
        },
        error => {
          this.setState({
            itemsLoaded: true,
            error,
          });
        });
  }

  componentDidUpdate(prevProps) {
    if(prevProps.section !== this.props.section) {
      this.setState(
        prevState => {
          return {
            ...prevState,
            itemsLoaded: false,
          };
        }
      );
      const {pagination} = this.props;
      let page = '';
      if (pagination)
        page = 'page=1';
      fetch(`${serverAddress}${this.props.section}${page}`)
        .then(res => res.json())
        .then(res => {
            if (pagination) {
              const lastPage = res.result.pagination.last_page;
              this.setState(
                prevState => {
                  return {
                    ...prevState,
                    currentPage: 1,
                    lastPage: lastPage,
                    firstPageEnable: false,
                    prevPageEnable: false,
                    nextPageEnable: lastPage > 1,
                    lastPageEnable: lastPage > 1,
                  };
                }
              );
            }
            this.setState(
              prevState => {
                return {
                  ...prevState,
                  catalogItems: res.result,
                  itemsLoaded: true,
                };
              }
            );
          },
          error => {
            this.setState({
              itemsLoaded: true,
              error,
            });
          });
    }
  }

  changeList = page => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          itemsLoaded: false,
        };
      }
    );
    fetch(`${serverAddress}${this.props.section}page=${page}`)
      .then(res => res.json())
      .then(res => {
        const lastPage = res.result.pagination.last_page;
        this.setState(
          prevState => {
            return {
              ...prevState,
              currentPage: page,
              lastPage: lastPage,
              firstPageEnable: page > 1,
              prevPageEnable: page > 1,
              nextPageEnable: page < lastPage,
              lastPageEnable: page < lastPage,
              catalogItems: res.result,
              itemsLoaded: true,
            };
          }
        );
      },
      error => {
        this.setState({
          itemsLoaded: true,
          error,
        });
      });
  };

  render() {
    // получаем переданные свойства товаров каталога
    const { error, itemsLoaded, catalogItems, currentPage, lastPage, firstPageEnable, prevPageEnable, nextPageEnable, lastPageEnable } = this.state;
    const { itemHandle, pagination } = this.props;
    let paginationButtons = '', content = '';

    if (pagination && lastPage > 1)
      paginationButtons = (
        <div className="pagination">
          <IconButton
            disabled={!firstPageEnable}
            onClick={() => this.changeList(1)}
          >
            <FirstPage/>
          </IconButton>
          <IconButton
            disabled={!prevPageEnable}
            onClick={() => this.changeList(currentPage - 1)}
          >
            <PrevPage/>
          </IconButton>
          <span className="currentPage">
                  {currentPage}
                </span>
          <IconButton
            disabled={!nextPageEnable}
            onClick={() => this.changeList(currentPage + 1)}
          >
            <NextPage/>
          </IconButton>
          <IconButton
            disabled={!lastPageEnable}
            onClick={() => this.changeList(lastPage)}
          >
            <LastPage/>
          </IconButton>
        </div>
      );
    if (error) {
      content = <p className="catalog_content">Ошибка: {error.message}</p>;
    }
    else
      if (!itemsLoaded) {
        content = <p className="load_info catalog_content">Пожалуйста, подождите, идет загрузка страницы</p>;
      }
      else
        if (catalogItems === undefined || catalogItems.length === 0 || catalogItems.products === undefined || catalogItems.products.length === 0) {
          content = <p className="load_info catalog_content">Товары не найдены</p>;
        }
        else
          content = <div className="catalog_items catalog_content">
              {catalogItems.products.map((item, idx) => {
                return (
                  <ItemCard item={item} itemHandle={itemHandle} key={idx}/>
                );
              })}
            </div>;
    return (<Fragment>
        {content}
        {paginationButtons}
      </Fragment>
    );
  }
}