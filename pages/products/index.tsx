import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
// Components
import Products from '@/screens/Products/products';
// Services
import { Endpoints } from '@/services/apis';
import { LayoutSettings } from '@/configs/layout';
// Models
import { AdsAndProductsQueryModel, AdsAndProductsResponse } from '@/models/adsAndProducts';
import { ProductsProps } from '@/models/pages/productsAndAds';
import { CategoryModel } from '@/models/categories';
import { CityLookupModel } from '@/models/lookups';
import { AdsAndProductsFiltersIds } from '@/services/staticLookups';

export const getServerSideProps: GetServerSideProps = async ({ locale, query }: GetServerSidePropsContext) => {
  const filter = query?.type || '';
  const isValidFilter = AdsAndProductsFiltersIds.includes(filter as string);

  const payload: AdsAndProductsQueryModel = { 
    type: 'product', 
    perPage: LayoutSettings.initialPerPage 
  };

  if(isValidFilter) {
    payload.orderBy = filter as string;
  }

  const categoriesResponse = await Endpoints.lookups.categories();
  const citiesResponse = await Endpoints.lookups.cities();
  const productsResponse = await Endpoints.adsAndProducts(payload);
  
  const cities: CityLookupModel[] = (citiesResponse.ok && citiesResponse.data) ? citiesResponse.data : [];
  const products: AdsAndProductsResponse = (productsResponse.ok && productsResponse.data) ? productsResponse.data as AdsAndProductsResponse : {} as AdsAndProductsResponse;
  const categories: CategoryModel[] = (categoriesResponse.ok && categoriesResponse.data) ? categoriesResponse.data : [];

  return {
    props: {
      ...(await serverSideTranslations(locale || 'ar', ['common', 'productsAndAds'])),
      products,
      cities,
      categories,
      orderBy: isValidFilter ? filter : '',
      pageTitle: isValidFilter ? filter : 'allProducts',
      // ? [Key] Mandatory to wipe the filter state on change
      key: filter || ''
    }
  };
};

const AllProducts: InferGetServerSidePropsType<typeof getServerSideProps> = ({ 
  cities,
  orderBy, 
  products, 
  pageTitle, 
  categories, 
}: ProductsProps) => {
  const { t } = useTranslation('productsAndAds');

  return (
    <>
      <Head>
        <title>{t(pageTitle)}</title>
        <meta name='description' content={t(pageTitle)} />
      </Head>

      <Products 
        orderBy={orderBy}
        products={products} 
        pageTitle={pageTitle}
        categories={categories}
        cities={cities}
      />

      {/* <ProductDetails /> */}
    </>
  );
};

export default AllProducts;
