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

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {
  const response = await Endpoints.adsAndProducts({ type: 'product', perPage: LayoutSettings.adsAndProducts.initialPerPage });
  console.log('res', response);
  const products: AdsAndProductsResponse = (response.ok && response.data) ? response.data as AdsAndProductsResponse : {} as AdsAndProductsResponse;
  const pageTitle = 'allProducts';

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
