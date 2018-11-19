import About from 'pages/AboutPage';
import Sellers from 'pages/SellersPage';
import Buyers from 'pages/BuyersPage';
import Delivery from 'pages/DeliveryPage';
import Login from 'pages/LoginPage';

/**
 * Маршрутизация приложения
 */
export default [
  // О нас
  {
    path: '/about',
    component: About,
    exact: true,
  },
  // Продавцам
  {
    path: '/sellers',
    component: Sellers,
    exact: true,
  },
  // Покупателям
  {
    path: '/buyers',
    component: Buyers,
    exact: true,
  },
  // Доставка и оплата
  {
    path: '/delivery',
    component: Delivery,
    exact: true,
  },
  // Логин
  {
    path: '/login',
    component: Login,
    exact: true,
  },
];