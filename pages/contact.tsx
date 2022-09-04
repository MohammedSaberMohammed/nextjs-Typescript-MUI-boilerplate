import Head from 'next/head';
import type { NextPage, GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ContactUs: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>ContactUs</title>
        <meta name='description' content='ContactUs is redy' />
      </Head>

      {t('hello')}
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale || 'ar', ['common']),
  },
});

export default ContactUs;
