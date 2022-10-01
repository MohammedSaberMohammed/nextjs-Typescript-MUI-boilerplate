import { FC } from 'react';
// Next
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
// MUI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
// Components
import Skeleton from './skeleton';
import AdvertismentAndProductCard from '@/components/AdvertismentAndProductCard';
import AdsAndProductsListing from '@/components/Layout/AdsAndProductsListing/adsAndProductsListing';
// Models
import { AdsProps } from '@/models/pages/productsAndAds';
import PageHeader from '@/components/PageHeader/pageHeader';
import { AdsAndProductsModel } from '@/models/adsAndProducts';
// Services
import { Endpoints } from '@/services/apis';

const Advertisments: FC<AdsProps> = ({ ads, pageTitle, categories, cities, orderBy }) =>  {
  const { t } = useTranslation('productsAndAds');

  return (
    <section>
      <PageHeader 
        title={t(pageTitle)} 
        renderAction={() => (
          <Breadcrumbs 
            aria-label="breadcrumb"
            separator={
              <Image 
                src={'/icons/arrow-square-left.svg'} 
                width={24}
                height={24}
                alt='separator'
              />
            }
          >
            <Link href="/">
              <a className='enabled-breadcrumb'>{t('home')}</a>
            </Link>
            <Link href="/advertisments">
              <a className='enabled-breadcrumb'>{t('theAdvertisments')}</a>
            </Link>
            <Typography className='disabled-breadcrumb'>{t(pageTitle)}</Typography>
          </Breadcrumbs>
        )}
      />

      <AdsAndProductsListing
        type='ad'
        cities={cities}
        initialData={ads}
        categories={categories}
        orderBy={orderBy || ''}
        showOrderByFilter={!orderBy}
        callback={Endpoints.adsAndProducts}
      >
        {({ data, isLoading }) => (
          <Grid container spacing={2} px={0}>
            {isLoading ? <Skeleton /> : data.map((product: AdsAndProductsModel) => (
              <Grid key={product.id} item px={0} xs={12} md={6} lg={4}>
                <AdvertismentAndProductCard
                  product={product}
                />
                      
              </Grid>
            ))}
          </Grid>
        )}
      </AdsAndProductsListing>
    </section>
  );
};

export default Advertisments;
