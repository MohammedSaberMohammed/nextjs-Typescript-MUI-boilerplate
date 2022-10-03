import { FC } from 'react';
// Next
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// Components
import Carousel from '@/components/Carousel/carousel';
import AdvertismentAndProductCard from '@/components/AdvertismentAndProductCard';
// Models
import { AdsAndProductsModel } from '@/models/adsAndProducts';
// Utils
import { LayoutSettings } from '@/configs/layout';
import { AdsAndProductsFilters } from '@/services/staticLookups';
// Styles
import classes from './newestProducts.module.scss';

interface Props {
  products: AdsAndProductsModel[]
}

const NewestProducts: FC<Props>  = ({ products }) => {
  const { t } = useTranslation('home');

  return (
    <section className={classes.wrapper}>
      <Container maxWidth={LayoutSettings.maxWidth}>
        <Box mb={5} display='flex' alignItems='center' justifyContent='space-between'>
          <h3 className={classes.title}> {t('newestProducts')}</h3>
          
          <div>
            <Link href={`/products?type=${AdsAndProductsFilters.newest}`} passHref>
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
                    alt='browse newest products' 
                  />
                )}
              >
                {t('seeAll')}
              </Button>
            </Link>

          </div>
        </Box>

        <Carousel>
          {products.map((product: AdsAndProductsModel) => (
            <AdvertismentAndProductCard
              key={product.id}
              product={product}
            />
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default NewestProducts;
