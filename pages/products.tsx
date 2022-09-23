import Head from 'next/head';
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
// Components
// import HomePage from '@/screens/Home';
// Utils
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'ar', ['common'])),
    },
  };
};

const Products: InferGetStaticPropsType<typeof getStaticProps> = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('pro')}</title>
        <meta name='description' content='Products is ready' />
      </Head>

      {/* <ProductsPage /> */}

      <h1>Products here</h1>
      
    </>
  );
};

export default Products;
