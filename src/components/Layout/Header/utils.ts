import { signOut } from 'next-auth/react';
// Next
import Router from 'next/router';
// styles
import classes from './header.module.scss';
// Utils
import { LayoutSettings } from '@/configs/layout';
// Models
import { CategoryModel } from '@/models/categories';
import { HeaderMenu, HeaderMenuItem } from '@/models/headerMenu';
import { DevelopmentEnv } from '@/configs/development';
import { AdsAndProductsFilters } from '@/services/staticLookups';

const getAccountMenuItems = (t: any, profile: any): HeaderMenuItem[] => {

  if (profile) {
    return [
      { title: t('myOrders'), link: '/', iconPath: '/icons/book.svg', suffix: 12 },
      { title: t('myAds'), link: '/', iconPath: '/icons/document.svg', suffix: 6 },
      { title: t('addAnAd'), link: '/', iconPath: '/icons/add-circle.svg' },
      { title: t('myChats'), link: '/', iconPath: '/icons/chat.svg' },
      { title: t('favorite'), link: '/', iconPath: '/icons/favorite.svg' },
      { title: t('myAddresses'), link: '/', iconPath: '/icons/map.svg' },
      { title: t('profile'), link: '/', iconPath: '/icons/edit.svg' },
      { 
        title: t('logout'), 
        iconPath: '/icons/logout.svg',
        link: '',
        props: { 
          className: classes.logout, 
          onClick: () => {
            signOut({ redirect: false });
            
            Router.push(LayoutSettings.anonymousPath);
            localStorage.setItem(DevelopmentEnv.appToken, '');
          }, 
        }
      },
    ];
  }

  return [
    { title: t('login'), link: '/login' },
    { title: t('signup'), link: '/signup'},  
  ];
};

const generateMenus = (t: any, profile?: any): {[key: string]: HeaderMenu} => ({
  storeMenu: {
    id: 'store',
    title: t('store'),
    items: [
      { title: t('allProducts') as string, link: '/products' },
      { title: t('newestProducts') as string, link: `/products?type=${AdsAndProductsFilters.newest}` },
      { title: t('bestSeller') as string, link: `/products?type=${AdsAndProductsFilters.bestseller}` },
    ]
  },

  adsMenu: {
    id: 'ads',
    title: t('advertisments'),
    items: [
      { title: t('allAds') as string, link: '/advertisments' },
      { title: t('newAds') as string, link: `/advertisments?type=${AdsAndProductsFilters.newest}` },
      { title: t('mostViewed') as string, link: `/advertisments?type=${AdsAndProductsFilters.mostvisited}` },
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