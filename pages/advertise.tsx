// Next
import Head from 'next/head';
import { GetStaticProps, InferGetStaticPropsType, GetStaticPropsContext  } from 'next';
// i18n 
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// Components
import AdvertiseScreen from '@/screens/Advertise/advertise';
// Services
import { Endpoints } from '@/services/apis';
// Models
import { CityLookupModel } from '@/models/lookups';
import { CategoryModel } from '@/models/categories';
import { AdvertisePageModel } from '@/models/pages/advertise';

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const brandsRes = await Endpoints.brands();
  const citiesResponse = await Endpoints.lookups.cities();
  const categoriesResponse = await Endpoints.lookups.categories();

  const cities: CityLookupModel[] = (citiesResponse.ok && citiesResponse.data) ? citiesResponse.data : [];
  const categories: CategoryModel[] = (categoriesResponse.ok && categoriesResponse.data) ? categoriesResponse.data : [];
  const brands = (brandsRes.ok && brandsRes.data) ? brandsRes.data : [];

  return {
    props: {
      cities,
      brands,
      categories,
      ...(await serverSideTranslations(context.locale || 'ar', ['common', 'advertise'])),
    },
  };
};

const AdvertisePage: InferGetStaticPropsType<typeof getStaticProps> = (props: AdvertisePageModel) => {
  const { t } = useTranslation('advertise');

  return (
    <>
      <Head>
        <title>{t('advertise')}</title>
        <meta name='description' content={t('pageDescription')} />
      </Head>
      
      <AdvertiseScreen { ...props } />
    </>
  );
};

export default AdvertisePage;
