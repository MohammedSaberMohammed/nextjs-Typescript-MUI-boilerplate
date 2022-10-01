// Next
import Head from 'next/head';
import { GetServerSideProps, InferGetServerSidePropsType, GetServerSidePropsContext  } from 'next';
// i18n 
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// Components
import LoginScreen from '@/screens/Auth/Login/login';

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  // fetch(' https://biker.jadeer.co/sanctum/csrf-cookie').then(console.log);
  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'ar', ['common', 'login'])),
      // csrfToken: await getCsrfToken(context),
    },
  };
};

const Login: InferGetServerSidePropsType<typeof getServerSideProps> = () => {
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
