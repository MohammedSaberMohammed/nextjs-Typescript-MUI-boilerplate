// Next
import Head from 'next/head';
import { GetServerSideProps, InferGetServerSidePropsType, GetServerSidePropsContext  } from 'next';
// i18n 
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// Components
import SearchScreen from '@/screens/Search/search';
import { Endpoints } from '@/services/apis';
import { CategoryModel } from '@/models/categories';
import { AdsAndProductsQueryModel, AdsAndProductsResponse } from '@/models/adsAndProducts';
import { LayoutSettings } from '@/configs/layout';
import { SearchProps } from '@/models/pages/search';

export const getServerSideProps: GetServerSideProps = async ({ query, locale }: GetServerSidePropsContext) => {
  const { text, categoryId } = query;
  
  console.log({ text, categoryId });

  if(!text) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  let categories: CategoryModel[] = [];
  let ads: AdsAndProductsResponse = {} as AdsAndProductsResponse;  
  let products: AdsAndProductsResponse = {} as AdsAndProductsResponse;

  const searchPayload: AdsAndProductsQueryModel = {
    search: String(text)
  };

  const categoriesRes = await Endpoints.lookups.categories();

  categories = (categoriesRes.ok && categoriesRes.data) ? categoriesRes.data : categories;

  const categoryDetails: CategoryModel | undefined = categories.find((category: CategoryModel) => category.id === Number(categoryId));

  if (categoryDetails) {
    searchPayload.category_id = Number(categoryId);
  }

  const adsRes = await Endpoints.adsAndProducts({ type: 'ad', perPage: LayoutSettings.initialPerPage, ...searchPayload });
  const productsRes = await Endpoints.adsAndProducts({ type: 'product', perPage: LayoutSettings.initialPerPage, ...searchPayload });

  ads = (adsRes.ok && adsRes.data) ? (adsRes.data as AdsAndProductsResponse) : ads;
  products = (productsRes.ok && productsRes.data) ? (productsRes.data as AdsAndProductsResponse) : products;

  return {
    props: {
      ...(await serverSideTranslations(locale || 'ar', ['common', 'search'])),
      ads,
      products,
      categoryId: categoryId || null,
      searchPayload,
      categoryDetails: categoryDetails || {} as CategoryModel,
      key: text || categoryId
    },
  };
};

const SearchPage: InferGetServerSidePropsType<typeof getServerSideProps> = (props: SearchProps) => {
  const { t } = useTranslation('search');

  return (
    <>
      <Head>
        <title>{props.searchPayload.search}</title>
        <meta name='description' content={t('searchResultsFor') + props.searchPayload.search} />
      </Head>
      
      <SearchScreen {...props} />
    </>
  );
};

export default SearchPage;
