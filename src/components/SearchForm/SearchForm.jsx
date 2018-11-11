import './SearchForm.scss';

import React, { PureComponent } from 'react';
// Проверка свойств
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

// Данные для кнопки Найти
const searchButton = {id: 'search', name: 'Найти'};

/**
 * Класс SearchForm - компонент, отображающий на странице строку поиска товара
 */
export default class SearchForm extends PureComponent {
  constructor(props) {
    super(props);
    
    // значения полей, используемых в render()
    this.state = {
      // значение поля Товар по умолчанию
      item: '',
    };
  }

  // Проверка свойств
  static propTypes = {
    // свойство должно быть функцией
    onSend: PropTypes.func,
  };

  // TODO Отправка запроса по нажатию Enter
  // обработка нажатий на клавиши
  handleChange = event => {
    this.setState({
      // подставляем переменную в ключ объекта (item)
      [event.target.name]: event.target.value,
    });
  };

  // обработка щелчков по кнопке
  handleClick = () => {
    if (this.state.item !== '') {
      // получаем значение
      const {onSend} = this.props;

      onSend(this.state);
    }
  };

  // Вывод найденных товаров
  render() {    
    // получаем содержимое state
    const { item } = this.state;
    return (
      <div className="searcher">
        <input type="text" name="item" id="search_row" onChange={this.handleChange} value={item} placeholder=' '/>
        <label htmlFor="zip">Введите название товара</label>
        <span className="search_button">
            <Button
              variant="text"
              id={searchButton.id}
              onClick={this.handleClick}>
                {searchButton.name}
            </Button>
          </span>
      </div>
    );
  }
}