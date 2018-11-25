import './DeliveryPage.scss';

import React, { PureComponent } from 'react';
import Markdown from 'react-markdown';
import {serverAddress} from 'constants/ServerAddress';

/**
 * Класс DeliveryPage - компонент, отображающий страницу Доставка
 */
export default class DeliveryPage extends PureComponent {
  constructor(props) {
    super(props);

    // значения полей, используемых в render()
    this.state = {
      pageContent: '',
      contentLoaded: false,
    };
  }

  componentDidMount() {
    fetch(`${serverAddress}/api/pages/delivery`)
      .then(res => res.json())
      .then(res => {
          this.setState(
            prevState => {
              return {
                ...prevState,
                pageContent: res.result.page.content,
                contentLoaded: true,
              };
            }
          );
        },
        error => {
          this.setState({
            contentLoaded: true,
            error,
          });
        });
  }

  render() {
    const { error, pageContent, contentLoaded } = this.state;

    if (error) {
      return <p>Ошибка: {error.message}</p>;
    }
    else
      if (!contentLoaded) {
        return <p className="load_info">Пожалуйста, подождите, идет загрузка страницы</p>;
      }
      else {
        return (
          <div className="about_page">
            <div/>
            <div className="info">
              <Markdown
                escapeHtml={true}
                source={pageContent}
              />
            </div>
            <div className="bags"/>
          </div>
        );
      }
  }
}