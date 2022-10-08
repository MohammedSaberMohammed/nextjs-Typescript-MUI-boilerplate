import { FC } from 'react';
// Next
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
// MUI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
// Components
import PageHeader from '@/components/PageHeader/pageHeader';
// Models
import { CategoryModel } from '@/models/categories';
import { CategoriesListModel } from '@/models/pages/categories';
// Utils
import { LayoutSettings } from '@/configs/layout';
import { getRandomNumber } from '@/utils/global';
import { RandomColors } from '@/services/staticLookups';
// Styles
import classes from './categories.module.scss';

const ClassificationsList: FC<CategoriesListModel>  = ({ categories }) => {
  const { t } = useTranslation('categories');
  
  const getCategoryColor = () => {
    const randomNumber = getRandomNumber(0, RandomColors.length);

    return RandomColors[randomNumber] || '';
  };

  return (
    <section >
      <PageHeader 
        title={t('pageTitle')} 
        subTitle={t('pageDescription')}
      />

      <Container maxWidth={LayoutSettings.maxWidth} className={classes.wrapper}>
        <Grid container spacing={2} px={0}>
          {categories.map((category: CategoryModel) => (
            <Grid key={category.id} item px={0} xs={12} sm={6} md={4}>  
              <Link href={`/categories/${category.id}`} >
                <a>
                  <Box
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
                </a>

              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

ClassificationsList.defaultProps = {
  categories: []
};

export default ClassificationsList;
