// Next
import Head from 'next/head';
import { GetServerSideProps, InferGetServerSidePropsType, GetServerSidePropsContext  } from 'next';
// i18n 
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// Components
import ResetPasswordScreen from '@/screens/Auth/ResetPassword/resetPassword';

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'ar', ['common', 'reset-password']))
    },
  };
};

const ResetPassword: InferGetServerSidePropsType<typeof getServerSideProps> = () => {
  const { t } = useTranslation('reset-password');

  return (
    <>
      <Head>
        <title>{t('resetPassword')}</title>
        <meta name='description' content={t('pageDescription')} />
      </Head>
      
      <ResetPasswordScreen />
    </>
  );
};

export default ResetPassword;
