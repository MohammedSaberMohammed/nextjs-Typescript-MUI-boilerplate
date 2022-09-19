import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType  } from 'next';
// Next
import Head from 'next/head';
// i18n 
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// Components
import LoginScreen from '@/screens/Auth/Login';

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'ar', ['common', 'login'])),
    },
  };
};

const Login: InferGetStaticPropsType<typeof getStaticProps> = () => {
  const { t } = useTranslation('login');

  return (
    <>
      <Head>
        <title>{t('login')}</title>
        <meta name='description' content={t('pageDescription')} />
      </Head>
      
      <LoginScreen />
    </>
  );
};

export default Login;
