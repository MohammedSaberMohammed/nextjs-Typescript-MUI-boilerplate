import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
// Components
import MyAds from '@/screens/MyAds/myAds';
// Utils
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// 

export const getServerSideProps: GetServerSideProps = async ({ locale }: GetServerSidePropsContext) => {

  return {
    props: {
      ...(await serverSideTranslations(locale || 'ar', ['common', 'my-ads'])),
    }
  };
};

const MyAdsPage: InferGetServerSidePropsType<typeof getServerSideProps> = () => {
  const { t } = useTranslation('my-ads');

  return (
    <>
      <Head>
        <title>{t('pageTitle')}</title>
        <meta name='description' content={t('pageDescription')} />
      </Head>

      <MyAds />
    </>
  );
};

export default MyAdsPage;
