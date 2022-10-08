import { AdsAndProductsFilters } from '@/services/staticLookups';
import { FooterLink } from '@/models/footer';

interface FooterLinks {
  sections: FooterLink[],
  important: FooterLink[],
}

const generateFooterLinks = (t: any): FooterLinks => ({
  sections: [
    {title: t('home'), link: '/'},
    {title: t('successPartners'), link: '/'},
    {title: t('newestProducts'), link: `/products?type=${AdsAndProductsFilters.newest}`},
    {title: t('basket'), link: '/'},
    {title: t('bestSeller'), link: `/products?type=${AdsAndProductsFilters.bestseller}`},
    {title: t('addYourAd'), link: '/advertise'},
    {title: t('moreVisitedAds'), link: `/advertisments?type=${AdsAndProductsFilters.mostvisited}`},
    {title: t('contactUs'), link: '/'},
    {title: t('sparePartsSections'), link: '/categories'},
  ],
  important: [
    { title: t('privacyPolicy'), link: '/' },
    { title: t('termsAndConditions'), link: '/' },
    { title: t('favorite'), link: '/' },
    { title: t('returnPolicy'), link: '/' },
    { title: t('myAddresses'), link: '/' }
  ]
});

export {
  generateFooterLinks
};