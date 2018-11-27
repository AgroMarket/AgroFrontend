import './CatalogProducer.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import {serverAddress} from 'constants/ServerAddress';

// Данные для кнопки Назад
const backButton = {id: 'back', name: 'Назад'};

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
    producerLink: PropTypes.string,
    // Функция возврата в каталог из просмотра информации о производителе товара
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
    // получаем переданные свойства производителя товара
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
          <div className="producer_info">
            <h2 className="producer_title">Производитель товара: {catalogProducer.producer.name}</h2>
            <p className="producer_region">
              Регион: {catalogProducer.producer.address}
            </p>
              <p className="producer_phone">
              Телефон: +7-{catalogProducer.producer.phone}
            </p>
            <p className="producer_email">
              Электронная почта: {catalogProducer.producer.email}
            </p>
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