import Head from 'next/head';
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
// Components
import AboutUs from '@/screens/AboutUs/aboutUs';
// Utils
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// 

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {

  return {
    props: {
      ...(await serverSideTranslations(locale || 'ar', ['common', 'about-us'])),
    },
    revalidate: 1800
  };
};

const AboutUsPage: InferGetStaticPropsType<typeof getStaticProps> = () => {
  const { t } = useTranslation('about-us');

  return (
    <>
      <Head>
        <title>{t('pageTitle')}</title>
        <meta name='description' content={t('pageDescription')} />
      </Head>

      <AboutUs />
    </>
  );
};

export default AboutUsPage;
