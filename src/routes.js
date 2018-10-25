import Home from 'pages/HomePage';
import About from 'pages/AboutPage';
import Sellers from 'pages/SellersPage';
import Buyers from 'pages/BuyersPage';
import Delivery from 'pages/DeliveryPage';
import Basket from 'pages/BasketPage';

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
  // Корзина
  {
    path: '/basket',
    component: Basket,
    exact: true,
  },
];