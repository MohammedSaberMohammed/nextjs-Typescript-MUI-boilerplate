import Head from 'next/head';
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
// Components
import CategoriesList from '@/screens/Categories/List';
// Utils
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
// Models
import { CategoriesListModel } from '@/models/pages/categories';
import { CategoryModel } from '@/models/categories';
import { Endpoints } from '@/services/apis';

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {
  let categories: CategoryModel[] = [];

  const categoriesRes = await Endpoints.lookups.categories();

  categories = (categoriesRes.ok && categoriesRes.data) ? categoriesRes.data : categories;

  return {
    props: {
      ...(await serverSideTranslations(locale || 'ar', ['common', 'categories'])),
      categories
    },
  };
};

const Categories: InferGetStaticPropsType<typeof getStaticProps> = (props: CategoriesListModel) => {
  const { t } = useTranslation('categories');

  return (
    <>
      <Head>
        <title>{t('pageTitle')}</title>
        <meta name='description' content={t('pageDescription')} />
      </Head>

      <CategoriesList {...props} />       
    </>
  );
};

export default Categories;
