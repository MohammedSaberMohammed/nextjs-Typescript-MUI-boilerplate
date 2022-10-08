import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
// Components
import CategoryDetails from '@/screens/Categories/Details';
// Utils
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
// Models
import { CategoryDetailsModel } from '@/models/pages/categories';
import { CategoryModel } from '@/models/categories';
import { Endpoints } from '@/services/apis';
import { LayoutSettings } from '@/configs/layout';
import { AdsAndProductsResponse } from '@/models/adsAndProducts';

export const getServerSideProps: GetServerSideProps = async ({ locale, params }: GetServerSidePropsContext) => {
  const categoryId = Number(params?.id) || 0;

  let categories: CategoryModel[] = [];
  let ads: AdsAndProductsResponse = {} as AdsAndProductsResponse;  
  let products: AdsAndProductsResponse = {} as AdsAndProductsResponse;
  
  const categoriesRes = await Endpoints.lookups.categories();
  const adsRes = await Endpoints.adsAndProducts({ type: 'ad', category_id: categoryId, perPage: LayoutSettings.initialPerPage });
  const productsRes = await Endpoints.adsAndProducts({ type: 'product', category_id: categoryId, perPage: LayoutSettings.initialPerPage });
  
  ads = (adsRes.ok && adsRes.data) ? (adsRes.data as AdsAndProductsResponse) : ads;
  categories = (categoriesRes.ok && categoriesRes.data) ? categoriesRes.data : categories;
  products = (productsRes.ok && productsRes.data) ? (productsRes.data as AdsAndProductsResponse) : products;

  const categoryDetails: CategoryModel | undefined = categories.find((category: CategoryModel) => category.id === Number(categoryId));

  if(!categoryDetails) {
    return {
      redirect: {
        destination: '/categories',
        permanent: false
      }
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale || 'ar', ['common', 'categories'])),
      ads,
      products,
      categoryId,
      details: categoryDetails,
      key: categoryDetails.id || null
    },
  };
};

const CategoriesDetails: InferGetServerSidePropsType<typeof getServerSideProps> = (props: CategoryDetailsModel) => {
  const { t } = useTranslation('categories');

  return (
    <>
      <Head>
        <title>{props.details.title.ar}</title>
        <meta name='description' content={props.details.description || t('pageDescription')} />
      </Head>

      <CategoryDetails {...props} />       
    </>
  );
};

export default CategoriesDetails;
