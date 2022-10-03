import { FC } from 'react';
// Next
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
// MUI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// Components
import AdvertismentAndProductCard from '@/components/AdvertismentAndProductCard';
// Models
import { AdsAndProductsModel } from '@/models/adsAndProducts';
// Utils
import { LayoutSettings } from '@/configs/layout';
import { AdsAndProductsFilters } from '@/services/staticLookups';
// Styles
import classes from './bestSellingProducts.module.scss';

interface Props {
  products: AdsAndProductsModel[]
}

const BestSellingProducts: FC<Props>  = ({ products }) => {
  const { t } = useTranslation('home');

  return (
    <section className={classes.wrapper}>
      <Container maxWidth={LayoutSettings.maxWidth}>
        <Box mb={5} display='flex' alignItems='center' justifyContent='space-between'>
          <h3 className={classes.title}> {t('bestSellingProducts')}</h3>
          
          <div>
            <Link href={`/products?type=${AdsAndProductsFilters.bestseller}`} passHref> 
              <Button 
                fullWidth
                color='secondary'
                variant="contained" 
                className={classes.btn}
                endIcon={(
                  <Image 
                    src='/icons/arrow-square-left.svg' 
                    width={26} 
                    height={26} 
                    alt='add to basket' 
                  />
                )}
              >
                {t('seeAll')}
              </Button>
            </Link>
          </div>
        </Box>

        <Grid container spacing={2}>
          {products.map((product: AdsAndProductsModel) => (
            <Grid item key={product.id} xs={12} md={6}>
              <AdvertismentAndProductCard
                row
                product={product}
              />
            </Grid>
          ))}
        </Grid>

      </Container>
    </section>
  );
};

export default BestSellingProducts;
