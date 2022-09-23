import Head from 'next/head';
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
// Components
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

const NotFoundPage: InferGetStaticPropsType<typeof getStaticProps> = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('pro')}</title>
        <meta name='description' content='NotFoundPage is ready' />
      </Head>

      {/* <NotFoundPagePage /> */}

      <h1>NotFoundPage here</h1>
      
    </>
  );
};

export default NotFoundPage;
