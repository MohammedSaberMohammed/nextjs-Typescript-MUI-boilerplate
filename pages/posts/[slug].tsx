import Head from 'next/head';
import type { NextPage, GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const PostDetails: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>PostDetails</title>
        <meta name='description' content='PostDetails is redy' />
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

export default PostDetails;
