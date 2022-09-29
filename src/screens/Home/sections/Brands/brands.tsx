import { FC, ReactNode, useMemo, useRef } from 'react';
// Next
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
// MUI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
// Components
import Carousel from '@/components/Carousel/carousel';
// Utils
import { LayoutSettings } from '@/configs/layout';
// styles
import classes from './brands.module.scss';
// Models
import { BrandModel } from '@/models/brands';

interface Props {
  brands: BrandModel[]
}

const Brands: FC<Props> = ({ brands }) => {
  const { t } = useTranslation('home');
  const carouselRef = useRef<{ cutomControls: ReactNode }>();
  
  const initialSlidesToShow = useMemo(() => {
    const { home: { maxShownBrands } } = LayoutSettings;

    return maxShownBrands > brands.length ? brands.length : maxShownBrands;
  }, [LayoutSettings, brands]);

  const carouselSettings = useMemo(() => ({
    showCustomPaging: false,
    slidesToShow: initialSlidesToShow,
    slidesToScroll: initialSlidesToShow,
    customControlClass: classes.customControlClass,
    customControlsWrapperClass: classes.customControlsWrapperClass,
  }), [brands]);

  return (
    <section className={classes.wrapper}>
      <div className={classes.headerMask} >
        <Image 
          src='/images/webp/motorcycle-standing-street.webp'
          alt='Brands background'
          layout="fill"
          objectFit="cover"
          quality={100}
          priority={true}
        />
      </div>

      <Container 
        className={classes.contentWrapper} 
        maxWidth={LayoutSettings.maxWidth}
      >
        <Grid container spacing={2} px={0}>
          <Grid item px={0} xs={12} md={6} className={classes.titleActionsWrapper}>
            <h3 className={classes.title}>{t('browseBasedOnBrand')}</h3>

            <div className={classes.actionsWrapper}>
              {carouselRef.current && carouselRef.current.cutomControls}
            </div>
          </Grid>
          
          <Grid item px={0} xs={12} md={6}>
            <Carousel ref={carouselRef} { ...carouselSettings } >
              {brands.map((brand: BrandModel) => (
                <Box
                  key={brand.id}
                  className={classes.brandWrapper}
                >
                  <Image 
                    src={brand.logo.large} 
                    width={50} 
                    height={60} 
                    alt={brand.name} 
                  />
                </Box>
              ))}
            </Carousel>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Brands;
