import Home from 'pages/HomePage';
import About from 'pages/AboutPage';
import Comments from 'pages/CommentsPage';
import Delivery from 'pages/DeliveryPage';
import Help from 'pages/HelpPage';
import Contacts from 'pages/ContactsPage';

/**
 * Маршрутизация приложения
 */
export default [
  // Главная (стартовая) страница Ferma Store
  {
    path: '/',
    component: Home,
    exact: true,
  },
  // О нас
  {
    path: '/about',
    component: About,
    exact: true,
  },
  // Отзывы
  {
    path: '/comments',
    component: Comments,
    exact: true,
  },
  // Доставка
  {
    path: '/delivery',
    component: Delivery,
    exact: true,
  },
  // Вопросы и ответы
  {
    path: '/help',
    component: Help,
    exact: true,
  },
  // Контакты
  {
    path: '/contacts',
    component: Contacts,
    exact: true,
  },
];