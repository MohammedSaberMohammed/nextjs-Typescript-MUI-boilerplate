import Head from 'next/head';
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
// Components
import HomePage from '@/screens/Home';
// Utils
import { Endpoints } from '@/services/apis';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// Models
import { BrandModel } from '@/models/brands';
import { HomeProps } from '@/models/pages/home';
import { CategoryModel } from '@/models/categories';
import { AdsAndProductsModel } from '@/models/adsAndProducts';
import { AdsAndProductsFilters } from '@/services/staticLookups';

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {
  let brands: BrandModel[] = [];
  let categories: CategoryModel[] = [];
  let newAds: AdsAndProductsModel[] = [];
  let mostViewedAds: AdsAndProductsModel[] = [];  
  let bestSellingProducts: AdsAndProductsModel[] = [];
  let newestProducts: AdsAndProductsModel[] = [];

  const brandsRes = await Endpoints.brands();
  const categoriesRes = await Endpoints.lookups.categories();
  const newAdsResponse = await Endpoints.adsAndProducts({ type: 'ad', orderBy: AdsAndProductsFilters.newest, limit: 12 });
  const mostViewedAdsRes = await Endpoints.adsAndProducts({ type: 'ad', orderBy: AdsAndProductsFilters.mostvisited, limit: 4 });
  const newestProductsRes = await Endpoints.adsAndProducts({ type: 'product', orderBy: AdsAndProductsFilters.newest, limit: 12 });
  const bestSellingProductsRes = await Endpoints.adsAndProducts({ type: 'product', orderBy: AdsAndProductsFilters.bestseller, limit: 4 });

  brands = (brandsRes.ok && brandsRes.data) ? brandsRes.data : brands;
  categories = (categoriesRes.ok && categoriesRes.data) ? categoriesRes.data : categories;
  newAds = (newAdsResponse.ok && newAdsResponse.data) ? (newAdsResponse.data as AdsAndProductsModel[]) : newAds;
  newestProducts = (newestProductsRes.ok && newestProductsRes.data) ? (newestProductsRes.data as AdsAndProductsModel[]) : newestProducts;
  mostViewedAds = (mostViewedAdsRes.ok && mostViewedAdsRes.data) ? (mostViewedAdsRes.data as AdsAndProductsModel[]) : mostViewedAds;
  bestSellingProducts = (bestSellingProductsRes.ok && bestSellingProductsRes.data) ? (bestSellingProductsRes.data as AdsAndProductsModel[]) : bestSellingProducts;

  return {
    props: {
      brands,
      newAds,
      categories,
      mostViewedAds,
      newestProducts,
      bestSellingProducts,
      ...(await serverSideTranslations(locale || 'ar', ['common', 'home'])),
    },
    revalidate: 1800
  };
};

const Home: InferGetStaticPropsType<typeof getStaticProps> = (props: HomeProps) => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('home')}</title>
        <meta name='description' content='Home is ready' />
      </Head>

      <HomePage {...props} />
    </>
  );
};

export default Home;
