import { useEffect } from 'react';
// Next
import Head from 'next/head';
import { useSession, getCsrfToken } from 'next-auth/react';
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
      csrfToken: await getCsrfToken(context),
    },
  };
};

const Login: InferGetServerSidePropsType<typeof getServerSideProps> = ({ csrfToken }: {csrfToken: string}) => {
  const { t } = useTranslation('login');
  const { data: session, status } = useSession();

  useEffect(() => console.log({csrfToken, status, session}), []);

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
