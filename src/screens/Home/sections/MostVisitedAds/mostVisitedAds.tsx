import { FC } from 'react';
// Next
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
// Styles
import classes from './mostVisitedAds.module.scss';

interface Props {
  ads: AdsAndProductsModel[]
}

const MostVisitedAds: FC<Props>  = ({ ads }) => {
  const { t } = useTranslation('home');

  return (
    <section className={classes.wrapper}>
      <Container maxWidth={LayoutSettings.maxWidth}>
        <Box mb={5} display='flex' alignItems='center' justifyContent='space-between'>
          <h3 className={classes.title}> {t('mostVisitedAds')}</h3>
          
          <div>
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
          </div>
        </Box>

        <Grid container spacing={2}>
          {ads.map((ad: AdsAndProductsModel) => (
            <Grid item key={ad.id} xs={12} md={6}>
              <AdvertismentAndProductCard
                row
                product={ad}
              />
            </Grid>
          ))}
        </Grid>

      </Container>
    </section>
  );
};

export default MostVisitedAds;
