import './index.scss';

import React from 'react';
import ReactDom from 'react-dom';
import App from 'components/App';

// Передаем корневой компонент App в DOM, инициализируем и визуализируем все дерево компонентов
ReactDom.render(
  <App/>,
  // привязываем react-приложение к HTML
  document.getElementById('root')
);