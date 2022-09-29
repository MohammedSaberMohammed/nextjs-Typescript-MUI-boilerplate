import { FC, useMemo } from 'react';
// Next
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
// MUI
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// Components
import Carousel from '@/components/Carousel/carousel';
// Models
import { CategoryModel } from '@/models/categories';
// Utils
import { LayoutSettings } from '@/configs/layout';
import { getRandomNumber } from '@/utils/global';
import { RandomColors } from '@/services/staticLookups';
// Styles
import classes from './sparePartsSections.module.scss';

interface Props {
  categories: CategoryModel[]
}

const SparePartsSections: FC<Props>  = ({ categories }) => {
  const { t } = useTranslation('home');
  
  const getCategoryColor = () => {
    const randomNumber = getRandomNumber(0, RandomColors.length);

    return RandomColors[randomNumber] || '';
  };

  const initialSlidesToShow = useMemo(() => {
    const { home: { maxShownSpareParts } } = LayoutSettings;

    return maxShownSpareParts > categories.length ? categories.length : maxShownSpareParts;
  }, [LayoutSettings, categories]);

  const carouselSettings = useMemo(() => ({
    showCustomPaging: false,
    slidesToShow: initialSlidesToShow,
    slidesToScroll: initialSlidesToShow,
  }), [categories]);

  return (
    <section className={classes.wrapper}>
      <Container maxWidth={LayoutSettings.maxWidth}>
        <Box mb={5} display='flex' alignItems='center' justifyContent='space-between'>
          <h3 className={classes.title}> {t('sparePartsSections')}</h3>
        </Box>

        <Carousel { ...carouselSettings }>
          {categories.map((category: CategoryModel) => (
            <Box
              key={category.id}
              bgcolor={getCategoryColor()}
              className={classes.categoryWrapper}
            >
              <Image 
                src={category.icon.large} 
                width={50} 
                height={60} 
                alt='category image' 
              />

              <p className={classes.categoryName}>{category.title.ar}</p>
            </Box>
          ))}
        </Carousel>

      </Container>
    </section>
  );
};

export default SparePartsSections;
