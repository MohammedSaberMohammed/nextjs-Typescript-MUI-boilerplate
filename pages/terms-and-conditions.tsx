import Head from 'next/head';
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
// Components
import TermsAndConditions from '@/screens/TermsAndConditions/termsAndConditions';
// Utils
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// 

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {

  return {
    props: {
      ...(await serverSideTranslations(locale || 'ar', ['common', 'termsAndConditions'])),
    },
    revalidate: 1800
  };
};

const TermsAndConditionsPage: InferGetStaticPropsType<typeof getStaticProps> = () => {
  const { t } = useTranslation('termsAndConditions');

  return (
    <>
      <Head>
        <title>{t('pageTitle')}</title>
        <meta name='description' content={t('pageDescription')} />
      </Head>

      <TermsAndConditions />
    </>
  );
};

export default TermsAndConditionsPage;
