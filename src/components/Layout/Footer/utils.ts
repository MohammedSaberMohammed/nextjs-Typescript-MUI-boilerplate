import { FooterLink } from '@/models/footer';

interface FooterLinks {
  sections: FooterLink[],
  important: FooterLink[],
}

const generateFooterLinks = (t: any): FooterLinks => ({
  sections: [
    {title: t('home'), link: '/'},
    {title: t('successPartners'), link: '/'},
    {title: t('newestProducts'), link: '/'},
    {title: t('basket'), link: '/'},
    {title: t('bestSeller'), link: '/'},
    {title: t('addYourAd'), link: '/'},
    {title: t('moreVisitedAds'), link: '/'},
    {title: t('contactUs'), link: '/'},
    {title: t('sparePartsSections'), link: '/'},
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