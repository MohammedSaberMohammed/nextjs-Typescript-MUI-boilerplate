import { FC, useState } from 'react';
// MUI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'next-i18next';
import Container from '@mui/material/Container';
// Utils
import { LayoutSettings } from '@/configs/layout';
import ImageGallery from '@/components/ImageGallery';
// Models
import { AdAndProductDetails } from '@/models/pages/productsAndAds';
// styles
import classes from './products.module.scss';
import Breadcrumb from '@/components/Breadcrumb';
import { BreadCrumbItem } from '@/models/breadcrumb';
import PageHeader from '@/components/PageHeader/pageHeader';

const ProductDetails: FC<AdAndProductDetails> = ({ breadcrumbTitle, details }) => {
  const { t } = useTranslation('productsAndAds');

  const images = details.media.map((image: any) => ({ 
    original: image.large, 
    thumbnail: image.small 
  }));

  const breadCrumbItems: BreadCrumbItem[] = [
    { link: '/', text: t('home') },
    { link: '/products', text: t('store') },
    { link: `/products?type=${breadcrumbTitle}`, text: t(breadcrumbTitle) },
    { text: details.title },
  ];

  return (
    <section>
      <PageHeader 
        title={t(details.title)} 
        renderAction={() => <Breadcrumb items={breadCrumbItems} />}
      />
      
      <Container maxWidth={LayoutSettings.maxWidth} className={classes.wrapper}>
        <Grid container spacing={5}>
          {images.length && (
            <Grid item xs={12} sm={6}>
              <ImageGallery items={images} />
            </Grid>
          )}

          <Grid item xs={12} sm={6}>
            <Box className={classes.infoWrapper}>
              <Box className={classes.badgesAndFavoriteWrapper}>
                <Box className={classes.badgesWrapper}>
                    asdasd
                </Box>
                  fav here
              </Box>

              <h2 className={classes.title}>{details.title}</h2>

              <Box className={classes.discount}>30%</Box>
            
              <Box className={classes.pricesWrapper}>
                10 - 18
                <span className={classes.priceHint}>priceHint</span>
              </Box>

              {/* <Box className={classes.}>

              </Box> */}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default ProductDetails;
