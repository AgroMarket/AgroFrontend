import './CatalogProducer.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import {serverAddress} from 'constants/ServerAddress';

// Данные для кнопки Назад
const backButton = {id: 'back', name: 'Назад'};
// Данные для кнопки Все товары производителя
const showSellerCatalogButton = {
  id: 'open_products',
  name: 'Все товары производителя',
};

/**
 * Класс CatalogProducer - компонент, отображающий сведения о продавце на странице товара
 */
export default class CatalogProducer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // производитель товара
      catalogProducer: {},
      // состояние загрузки сведений о производителе товара
      producerLoaded: false,
      // ошибка загрузки
      error: null,
    };
  }

  // Проверка свойств
  static propTypes = {
    // Адрес для просмотра информации о производителе товара
    openedProducer: PropTypes.string,
    // Функция возврата в каталог из просмотра информации о производителе товара
    actionBack: PropTypes.func,
    // ID корзины на сервере
    basketID: PropTypes.string,
    showProducerCatalog: PropTypes.func,
    producerID: PropTypes.number,
  };

  // значения атрибутов по умолчанию
  static defaultProps = {
    // аттрибут openedProducer инициализируем пустой строкой
    openedProducer: '',
  };

  componentDidMount() {
    fetch(`${serverAddress}${this.props.openedProducer}`)
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
    // получаем переданные свойства производителя товара
    const { error, producerLoaded, catalogProducer } = this.state;
    const { actionBack, showProducerCatalog, producerID } = this.props;
    if (error) {
      return <p>CatalogProducer::Ошибка: {error.message}</p>;
    }
    else
      if (!producerLoaded) {
        return <p className="load_info">Пожалуйста, подождите, идет загрузка страницы</p>;
      }
      else {
        const phone = 'tel:+7-' + catalogProducer.producer.phone;
        const mail = 'mailto:' + catalogProducer.producer.email;
        return (
          <div className="producer_info">
            <h2 className="producer_title">Производитель товара: {catalogProducer.producer.name}</h2>
            <p className="producer_region">
              Регион: {catalogProducer.producer.address}
            </p>
              <p className="producer_phone">
              Телефон: <a href={phone}>{catalogProducer.producer.phone}</a>
            </p>
            <p className="producer_email">
              Электронная почта: <code><a href={mail}>{catalogProducer.producer.email}</a></code>
            </p>
            <div className="seller_catalog_button">
              <Button
                className="edit_button"
                variant="contained"
                color="primary"
                id={showSellerCatalogButton.id}
                onClick={() => showProducerCatalog(producerID)}
              >
                {showSellerCatalogButton.name}
              </Button>
            </div>
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
        );
      }
  }
}