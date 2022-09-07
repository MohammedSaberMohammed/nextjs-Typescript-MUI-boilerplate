import Head from 'next/head';
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
// Components
import HomePage from '@/screens/Home';
// Utils
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'ar', ['common'])),
    },
  };
};

const Home: InferGetStaticPropsType<typeof getStaticProps> = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name='description' content='Home is redy' />
      </Head>

      <HomePage />
    </>
  );
};

export default Home;
