import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType, GetStaticPaths } from 'next';
// Components
import Advertisments from '@/screens/Advertisments/advertisments';
// Services
import { Endpoints } from '@/services/apis';
import { LayoutSettings } from '@/configs/layout';
import { AdsAndProductsFiltersIds } from '@/services/staticLookups';
// Models
import { CityLookupModel } from '@/models/lookups';
import { CategoryModel } from '@/models/categories';
import { AdsProps } from '@/models/pages/productsAndAds';
import { AdsAndProductsResponse } from '@/models/adsAndProducts';

export const getStaticPaths: GetStaticPaths = () => { 
  return {
    paths: AdsAndProductsFiltersIds.map((filter: string) => ({ params: { filter } })),
    fallback: false
  };
}; 

export const getStaticProps: GetStaticProps = async ({ locale, params }: GetStaticPropsContext) => {
  const filter = params?.filter || '';

  const categoriesResponse = await Endpoints.lookups.categories();
  const citiesResponse = await Endpoints.lookups.cities();
  const adsResponse = await Endpoints.adsAndProducts({ type: 'ad', orderBy: filter as string, perPage: LayoutSettings.initialPerPage });
  
  const orderBy = filter;
  const pageTitle = `${filter}Ads`;
  const cities: CityLookupModel[] = (citiesResponse.ok && citiesResponse.data) ? citiesResponse.data : [];
  const ads: AdsAndProductsResponse = (adsResponse.ok && adsResponse.data) ? adsResponse.data as AdsAndProductsResponse : {} as AdsAndProductsResponse;
  const categories: CategoryModel[] = (categoriesResponse.ok && categoriesResponse.data) ? categoriesResponse.data : [];

  return {
    props: {
      ...(await serverSideTranslations(locale || 'ar', ['common', 'productsAndAds'])),
      ads,
      orderBy,
      pageTitle,
      cities,
      categories,
      key: pageTitle
    },
    revalidate: 1
  };
};

const FilteredAdvertisments: InferGetStaticPropsType<typeof getStaticProps> = ({ 
  ads, 
  cities,
  orderBy, 
  pageTitle, 
  categories, 
}: AdsProps) => {
  const { t } = useTranslation('productsAndAds');

  return (
    <>
      <Head>
        <title>{t(pageTitle)}</title>
        <meta name='description' content={t(pageTitle)} />
      </Head>

      <Advertisments 
        ads={ads}
        orderBy={orderBy}
        pageTitle={pageTitle}
        categories={categories}
        cities={cities}
      />
    </>
  );
};

export default FilteredAdvertisments;
