import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
// Components
import Advertisments from '@/screens/Advertisments/advertisments';
// Services
import { Endpoints } from '@/services/apis';
import { LayoutSettings } from '@/configs/layout';
// Models
import { AdsAndProductsResponse } from '@/models/adsAndProducts';
import { AdsProps } from '@/models/pages/productsAndAds';
import { CategoryModel } from '@/models/categories';
import { CityLookupModel } from '@/models/lookups';

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {
  const categoriesResponse = await Endpoints.lookups.categories();
  const citiesResponse = await Endpoints.lookups.cities();
  const adsResponse = await Endpoints.adsAndProducts({ type: 'ad', perPage: LayoutSettings.initialPerPage });
  
  const pageTitle = 'allAdvertisments';
  const cities: CityLookupModel[] = (citiesResponse.ok && citiesResponse.data) ? citiesResponse.data : [];
  const ads: AdsAndProductsResponse = (adsResponse.ok && adsResponse.data) ? adsResponse.data as AdsAndProductsResponse : {} as AdsAndProductsResponse;
  const categories: CategoryModel[] = (categoriesResponse.ok && categoriesResponse.data) ? categoriesResponse.data : [];

  return {
    props: {
      ...(await serverSideTranslations(locale || 'ar', ['common', 'productsAndAds'])),
      ads,
      pageTitle,
      cities,
      categories,
      key: pageTitle
    },
    revalidate: 1
  };
};

const AllAdvertisments: InferGetStaticPropsType<typeof getStaticProps> = ({ 
  ads, 
  cities,
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
        pageTitle={pageTitle}
        categories={categories}
        cities={cities}
      />
    </>
  );
};

export default AllAdvertisments;
