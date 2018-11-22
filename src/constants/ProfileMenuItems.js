import MyOrdersIcon from '@material-ui/core/SvgIcon/SvgIcon';

export const menuItems = [
  {
    id: 'profile_purchase',
    name: 'Мои покупки',
    component: 'ProfilePurchase',
    icon: MyOrdersIcon,
  },
  {
    id: 'profile_sellers',
    name: 'Мои поставщики',
    component: 'ProfileSellers',
    icon: MyOrdersIcon,
  },
  {
    id: 'seller_items',
    name: 'Мой прилавок',
    component: 'SellerItems',
    icon: MyOrdersIcon,
  },
  {
    id: 'seller_sells',
    name: 'Мои продажи',
    component: 'SellerSells',
    icon: MyOrdersIcon,
  },
  {
    id: 'seller_clients',
    name: 'Мои покупатели',
    component: 'SellerClients',
    icon: MyOrdersIcon,
  },
  {
    id: 'seller_profile',
    name: 'Мой профиль',
    component: 'SellerProfile',
    icon: MyOrdersIcon,
  },
  {
    id: 'seller_quit',
    name: 'Выйти',
    icon: MyOrdersIcon,
  },
];