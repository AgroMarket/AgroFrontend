import MyOrdersIcon from '@material-ui/core/SvgIcon/SvgIcon';

export const menuItems = [
  {
    id: 'profile_account',
    name: 'Счёт',
    component: 'ProfileAccount',
    icon: MyOrdersIcon,
  },
  {
    id: 'profile_purchase',
    name: 'Покупки',
    component: 'ProfilePurchase',
    icon: MyOrdersIcon,
  },
  {
    id: 'profile_sellers',
    name: 'Поставщики',
    component: 'ProfileSellers',
    icon: MyOrdersIcon,
  },
  {
    id: 'delivery_orders',
    name: 'Доставка',
    component: 'ProfileDelivery',
    icon: MyOrdersIcon,
  },
  {
    id: 'seller_items',
    name: 'Товары на продажу',
    component: 'SellerItems',
    icon: MyOrdersIcon,
  },
  {
    id: 'seller_sells',
    name: 'Продажи',
    component: 'ProfileSells',
    icon: MyOrdersIcon,
  },
  {
    id: 'seller_clients',
    name: 'Покупатели',
    component: 'ProfileClient',
    icon: MyOrdersIcon,
  },
  {
    id: 'profile_statistics',
    name: 'Статистика',
    component: 'ProfileStatistics',
    icon: MyOrdersIcon,
  },
  {
    id: 'user_profile',
    name: 'Профиль',
    component: 'UserProfile',
    icon: MyOrdersIcon,
  },
  {
    id: 'seller_quit',
    name: 'Выйти',
    icon: MyOrdersIcon,
  },
];