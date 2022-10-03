// Next
import Head from 'next/head';
import { GetServerSideProps, InferGetServerSidePropsType, GetServerSidePropsContext  } from 'next';
// i18n 
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// Components
import AdvertiseScreen from '@/screens/Advertise/advertise';

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'ar', ['common', 'advertise'])),
    },
  };
};

const Advertise: InferGetServerSidePropsType<typeof getServerSideProps> = () => {
  const { t } = useTranslation('advertise');

  return (
    <>
      <Head>
        <title>{t('advertise')}</title>
        <meta name='description' content={t('pageDescription')} />
      </Head>
      
      <AdvertiseScreen />
    </>
  );
};

export default Advertise;
