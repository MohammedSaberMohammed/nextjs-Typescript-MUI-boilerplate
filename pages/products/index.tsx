import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
// Components
import Products from '@/screens/Products/products';
// Services
import { Endpoints } from '@/services/apis';
import { LayoutSettings } from '@/configs/layout';
// Models
import { AdsAndProductsResponse } from '@/models/adsAndProducts';
import { ProductsProps } from '@/models/pages/productsAndAds';
import { CategoryModel } from '@/models/categories';
import { CityLookupModel } from '@/models/lookups';

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {
  const categoriesResponse = await Endpoints.lookups.categories();
  const citiesResponse = await Endpoints.lookups.cities();
  const productsResponse = await Endpoints.adsAndProducts({ type: 'product', perPage: LayoutSettings.initialPerPage });
  
  const pageTitle = 'allProducts';
  const cities: CityLookupModel[] = (citiesResponse.ok && citiesResponse.data) ? citiesResponse.data : [];
  const products: AdsAndProductsResponse = (productsResponse.ok && productsResponse.data) ? productsResponse.data as AdsAndProductsResponse : {} as AdsAndProductsResponse;
  const categories: CategoryModel[] = (categoriesResponse.ok && categoriesResponse.data) ? categoriesResponse.data : [];

  return {
    props: {
      ...(await serverSideTranslations(locale || 'ar', ['common', 'products'])),
      products,
      pageTitle,
      cities,
      categories,
      key: pageTitle
    },
    revalidate: 1
  };
};

const FilteredProducts: InferGetStaticPropsType<typeof getStaticProps> = ({ pageTitle, products, categories, cities }: ProductsProps) => {
  const { t } = useTranslation('products');

  return (
    <>
      <Head>
        <title>{t(pageTitle)}</title>
        <meta name='description' content={t(pageTitle)} />
      </Head>

      <Products 
        products={products} 
        pageTitle={pageTitle}
        categories={categories}
        cities={cities}
      />
    </>
  );
};

export default FilteredProducts;
