import LoginScreen from '@/screens/Auth/Login';
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType  } from 'next';
// i18n 
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'ar', ['common'])),
    },
  };
};

const Login: InferGetStaticPropsType<typeof getStaticProps> = () => {

  return <LoginScreen />;
};

export default Login;
