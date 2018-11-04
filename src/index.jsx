import './index.scss';

import React from 'react';
import ReactDom from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
// Тема для Material-UI
import { theme} from './theme';

import App from 'components/App';

// Передаем корневой компонент App в DOM, инициализируем и визуализируем все дерево компонентов
ReactDom.render(
  <MuiThemeProvider theme = { theme }>
    <App/>
  </MuiThemeProvider>,
  // привязываем react-приложение к HTML
  document.getElementById('root')
);