import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
// Components
import ProductDetails from '@/screens/Products/details';
// Services
import { Endpoints } from '@/services/apis';
import { AdsAndProductsFiltersIds } from '@/services/staticLookups';
// Models
import { AdAndProductDetails } from '@/models/pages/productsAndAds';

export const getServerSideProps: GetServerSideProps = async ({ locale, query, params }: GetServerSidePropsContext) => {
  const filter = query?.type || '';
  const isValidFilter = AdsAndProductsFiltersIds.includes(filter as string);
  const id = params?.id || '';

  const { ok, data } = await Endpoints.adDetails(id as string);

  if(!ok) {
    return {
      notFound: true
    };
  }
  
  return {
    props: {
      ...(await serverSideTranslations(locale || 'ar', ['common', 'productsAndAds'])),
      breadcrumbTitle: isValidFilter ? filter : 'allProducts',
      details: data
    },
  };
};

const ProductsDetails: InferGetServerSidePropsType<typeof getServerSideProps> = (props: AdAndProductDetails) => {
  return (
    <>
      <Head>
        <title>{props.details.title}</title>
        <meta name='description' content={props.details.description} />
      </Head>
      
      <ProductDetails {...props} />
    </>
  );
};

export default ProductsDetails;
