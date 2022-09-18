import { CategoryModel } from '@/models/categories';
import { HeaderMenu, HeaderMenuItem } from '@/models/headerMenu';

const getAccountMenuItems = (t: any, profile: any): HeaderMenuItem[] => {
  if (profile) {
    return [
      { title: t('login'), link: '/login' },
      { title: t('signup'), link: '/signup'},  
    ];
  }

  return [
    { title: t('myOrders'), link: '/', iconPath: '/icons/book.svg', suffix: 12 },
    { title: t('myAds'), link: '/', iconPath: '/icons/document.svg', suffix: 6 },
    { title: t('addAnAd'), link: '/', iconPath: '/icons/add-circle.svg' },
    { title: t('myChats'), link: '/', iconPath: '/icons/chat.svg' },
    { title: t('favorite'), link: '/', iconPath: '/icons/favorite.svg' },
    { title: t('myAddresses'), link: '/', iconPath: '/icons/map.svg' },
    { title: t('profile'), link: '/', iconPath: '/icons/edit.svg' },
    { title: t('logout'), link: '/', iconPath: '/icons/logout.svg' },
  ];
};

const generateMenus = (t: any, profile?: any): {[key: string]: HeaderMenu} => ({
  storeMenu: {
    id: 'store',
    title: t('store'),
    items: [
      { title: t('allProducts') as string, link: '/products' },
      { title: t('newestProducts') as string, link: '/products?type=newest' },
      { title: t('bestSeller') as string, link: '/products?type=best-seller' },
    ]
  },

  adsMenu: {
    id: 'ads',
    title: t('advertisments'),
    items: [
      { title: t('allAds') as string, link: '/advertisments' },
      { title: t('newAds') as string, link: '/advertisments?type=new' },
      { title: t('mostViewed') as string, link: '/advertisments?type=most-viewed' },
    ]
  },  

  account: {
    id: 'account',
    iconPath: '/icons/profile-circle.svg',
    title: t(profile ? 'myAccount' : 'register'),
    items: getAccountMenuItems(t, profile)
  },
});

const loadCategoryMenu = (t: any, categories: CategoryModel[]) => {
  const items = categories.map((category: CategoryModel) => ({
    title: category.title.ar,
    link: `/categories?type=${category.id}`,
    iconPath: category.icon.small
  }));

  return {
    id: 'sections',
    title: t('sections'),
    items
  };
};

export {
  generateMenus,
  loadCategoryMenu
};