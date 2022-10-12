import Head from 'next/head';
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
// Components
import PrivacyPolicy from '@/screens/PrivacyPolicy/privacyPolicy';
// Utils
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// 

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {

  return {
    props: {
      ...(await serverSideTranslations(locale || 'ar', ['common', 'privacy-policy'])),
    },
    revalidate: 1800
  };
};

const PrivacyPolicyPage: InferGetStaticPropsType<typeof getStaticProps> = () => {
  const { t } = useTranslation('privacy-policy');

  return (
    <>
      <Head>
        <title>{t('pageTitle')}</title>
        <meta name='description' content={t('pageDescription')} />
      </Head>

      <PrivacyPolicy />
    </>
  );
};

export default PrivacyPolicyPage;
