import './CatalogProducer.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import {serverAddress} from 'constants/ServerAddress';

// Данные для кнопки Назад
const backButton = {id: 'back', name: 'Назад'};

/**
 * Класс CatalogItem - компонент, отображающий сведения о товаре на странице
 */
export default class CatalogProducer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // товар каталога
      catalogProducer: {},
      // состояние загрузки товара каталога
      producerLoaded: false,
      // ошибка загрузки
      error: null,
    };
  }

  // Проверка свойств
  static propTypes = {
    // Адрес для просмотра информации о товаре каталога
    producerLink: PropTypes.string,
    // Функция возврата в каталог из просмотра информации о товаре каталога
    actionBack: PropTypes.func,
    // ID корзины на сервере
    basketID: PropTypes.string,
  };

  // значения атрибутов по умолчанию
  static defaultProps = {
    // аттрибут producerLink инициализируем пустой строкой
    producerLink: '',
  };

  componentDidMount() {
    fetch(`${serverAddress}${this.props.producerLink}`)
      .then(res => res.json())
      .then(res => {
          this.setState(
            prevState => {
              return {
                ...prevState,
                catalogProducer: res.result,
                producerLoaded: true,
              };
            }
          );
        },
        error => {
          this.setState({
            itemLoaded: true,
            error,
          });
        });
  }

  render() {
    // получаем переданные свойства товаров каталога
    const { error, producerLoaded, catalogProducer } = this.state;
    const { actionBack } = this.props;
    if (error) {
      return <p>CatalogProducer::Ошибка: {error.message}</p>;
    }
    else
      if (!producerLoaded) {
        return <p className="load_info">Пожалуйста, подождите, идет загрузка страницы</p>;
      }
      else {
        return (
          <div className="catalog_item">
            <div className="seller_items">
              <div className="seller_items_header">
                <h2>Страница производителя</h2>
              </div>
              <div className="seller_profile">
                <span className="profile_name">
                  {catalogProducer.producer.name}
                </span>
                <span className="profile_address">
              Регион: {catalogProducer.producer.address}
            </span>
                <span className="profile_phone">
                Телефон: +7-{catalogProducer.producer.phone}
            </span>
                <span className="profile_email">
                Электронная почта: {catalogProducer.producer.email}
            </span>
              </div>
            </div>
            <div>
              <div className="back_button">
                <Button
                  color="primary"
                  id={backButton.id}
                  onClick={() => actionBack()}
                >
                  {backButton.name}
                </Button>
              </div>
            </div>
          </div>
        );
      }
  }
}