import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
// MUI
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
// Components
import AdvertismentAndProductCard from '@/components/AdvertismentAndProductCard';
// Models
import { ProductsProps } from '@/models/pages/productsAndAds';
import PageHeader from '@/components/PageHeader/pageHeader';
import { AdsAndProductsModel } from '@/models/adsAndProducts';
// Configs
import { LayoutSettings } from '@/configs/layout';
// Styles
import classes from './products.module.scss';

const Products: FC<ProductsProps> = ({ products, pageTitle }) =>  {
  const { t } = useTranslation('products');
  
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
            <Link href="/products">
              <a className='enabled-breadcrumb'>{t('store')}</a>
            </Link>
            <Typography className='disabled-breadcrumb'>{t(pageTitle)}</Typography>
          </Breadcrumbs>
        )}
      />

      <Container className={classes.wrapper} maxWidth={LayoutSettings.maxWidth}>
        <Grid container spacing={2} px={0}>
          <Grid item px={0} xs={12} sm={4} md={3}>
            Filters
          </Grid>
          <Grid item px={0} xs={12} sm={8} md={9}>
            <Grid container spacing={2} px={0}>
              {products.data.map((product: AdsAndProductsModel) => (
                <Grid key={product.id} item px={0} xs={12} md={6} lg={4}>
                  <AdvertismentAndProductCard
                    product={product}
                  />
                </Grid>
              ))}

            </Grid>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Products;
