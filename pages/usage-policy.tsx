import Head from 'next/head';
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
// Components
import UsagePolicy from '@/screens/UsagePolicy/usagePolicy';
// Utils
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// 

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {

  return {
    props: {
      ...(await serverSideTranslations(locale || 'ar', ['common', 'usage-policy'])),
    },
    revalidate: 1800
  };
};

const UsagePolicyPage: InferGetStaticPropsType<typeof getStaticProps> = () => {
  const { t } = useTranslation('usage-policy');

  return (
    <>
      <Head>
        <title>{t('pageTitle')}</title>
        <meta name='description' content={t('pageDescription')} />
      </Head>

      <UsagePolicy />
    </>
  );
};

export default UsagePolicyPage;
