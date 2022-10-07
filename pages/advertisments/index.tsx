import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
// Components
import Advertisments from '@/screens/Advertisments/advertisments';
// Services
import { Endpoints } from '@/services/apis';
import { LayoutSettings } from '@/configs/layout';
// Models
import { AdsAndProductsQueryModel, AdsAndProductsResponse } from '@/models/adsAndProducts';
import { AdsProps } from '@/models/pages/productsAndAds';
import { CategoryModel } from '@/models/categories';
import { CityLookupModel } from '@/models/lookups';
import { AdsAndProductsFiltersIds } from '@/services/staticLookups';

export const getServerSideProps: GetServerSideProps = async ({ locale, query }: GetServerSidePropsContext) => {
  const filter = query?.type || '';
  const isValidFilter = AdsAndProductsFiltersIds.includes(filter as string);

  const payload: AdsAndProductsQueryModel = { 
    type: 'ad', 
    perPage: LayoutSettings.initialPerPage 
  };

  if(isValidFilter) {
    payload.orderBy = filter as string;
  }

  const categoriesResponse = await Endpoints.lookups.categories();
  const citiesResponse = await Endpoints.lookups.cities();
  const adsResponse = await Endpoints.adsAndProducts(payload);
  
  const cities: CityLookupModel[] = (citiesResponse.ok && citiesResponse.data) ? citiesResponse.data : [];
  const ads: AdsAndProductsResponse = (adsResponse.ok && adsResponse.data) ? adsResponse.data as AdsAndProductsResponse : {} as AdsAndProductsResponse;
  const categories: CategoryModel[] = (categoriesResponse.ok && categoriesResponse.data) ? categoriesResponse.data : [];

  return {
    props: {
      ...(await serverSideTranslations(locale || 'ar', ['common', 'productsAndAds'])),
      ads,
      cities,
      categories,
      orderBy: isValidFilter ? filter : '',
      pageTitle: isValidFilter ? filter : 'allAdvertisments',
      // ? [Key] Mandatory to wipe the filter state on change
      key: filter || ''
    }
  };
};

const AllAdvertisments: InferGetServerSidePropsType<typeof getServerSideProps> = ({ 
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

export default AllAdvertisments;
