import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType, GetStaticPaths } from 'next';
// Components
import Products from '@/screens/Products/products';
// Services
import { Endpoints } from '@/services/apis';
import { LayoutSettings } from '@/configs/layout';
import { AdsAndProductsFiltersIds } from '@/services/staticLookups';
// Models
import { AdsAndProductsResponse } from '@/models/adsAndProducts';
import { ProductsProps } from '@/models/pages/productsAndAds';

export const getStaticPaths: GetStaticPaths = () => { 
  return {
    paths: AdsAndProductsFiltersIds.map((filter: string) => ({ params: { filter } })),
    fallback: false
  };
}; 

export const getStaticProps: GetStaticProps = async ({ locale, params }: GetStaticPropsContext) => {
  const filter = params?.filter || '';
  const response = await Endpoints.adsAndProducts({ type: 'product', orderBy: filter as string, perPage: LayoutSettings.adsAndProducts.initialPerPage });
  
  const products: AdsAndProductsResponse = (response.ok && response.data) ? response.data as AdsAndProductsResponse : {} as AdsAndProductsResponse;
  const pageTitle = filter;

  return {
    props: {
      ...(await serverSideTranslations(locale || 'ar', ['common', 'products'])),
      products,
      pageTitle
    },
    revalidate: 1
  };
};

const FilteredProducts: InferGetStaticPropsType<typeof getStaticProps> = ({ pageTitle, products }: ProductsProps) => {
  const { t } = useTranslation('products');

  return (
    <>
      <Head>
        <title>{t(pageTitle)}</title>
        <meta name='description' content={t(pageTitle)} />
      </Head>

      <Products products={products} pageTitle={pageTitle} />
    </>
  );
};

export default FilteredProducts;
