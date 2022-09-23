// Next
import Head from 'next/head';
import { GetServerSideProps, InferGetServerSidePropsType, GetServerSidePropsContext  } from 'next';
// i18n 
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// Components
import SignupScreen from '@/screens/Auth/Signup/signup';

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'ar', ['common', 'signup']))
    },
  };
};

const Signup: InferGetServerSidePropsType<typeof getServerSideProps> = () => {
  const { t } = useTranslation('signup');

  return (
    <>
      <Head>
        <title>{t('signup')}</title>
        <meta name='description' content={t('pageDescription')} />
      </Head>
      
      <SignupScreen />
    </>
  );
};

export default Signup;
