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
    { title: t('privacyPolicy'), link: '/privacy-policy' },
    { title: t('aboutUs'), link: '/about-us' },
    { title: t('termsAndConditions'), link: '/terms-and-conditions' },
    { title: t('favorite'), link: '/' },
    { title: t('usagePolicy'), link: '/usage-policy' },
    { title: t('myAddresses'), link: '/' }
  ]
});

export {
  generateFooterLinks
};