import Head from 'next/head';
import type { NextPage, GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Posts: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>Posts</title>
        <meta name='description' content='Posts is redy' />
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

export default Posts;
