import { FC } from 'react';
// Next
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
// MUI
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
// Components
import ActionsMenu from './Menu/menu';
// Utils
import moment from 'moment';
// Models
import { PropsModel } from './model';
// Styles
import classNames from 'classnames';
import classes from './card.module.scss';
import { AdsAndProductsCategoryModel } from '@/models/adsAndProducts';
import 'moment/locale/ar';
moment.locale('ar');

const ProductCard: FC<PropsModel> = ({ row, ad }: PropsModel) =>  {
  const { t } = useTranslation('common');
  const { price, image, title, categories, user } = ad;

  const onCardClick = () => {
    // Todo: Go to details page
  };

  return (
    <Box
      sx={{ direction: 'ltr' }}
      onClick={onCardClick}
      className={classNames(classes.cardWrapper, { [classes.row]: row })}
    >
      <Container disableGutters>
        <Grid sx={{padding: 0}} container spacing={row ? 2 : 0}>
          <Grid item sx={{padding: 0}} xs={12} sm={row ? 5 : 12} md={row ? 4 : 12}>
            <Box className={classes.imageWrapper}>
              <Image 
                src={image.large} 
                layout='fill'
                objectFit='cover'
                alt={title} 
              />
            </Box>
          </Grid>           
          
          <Grid item sx={{padding: 0}} xs={12} sm={row ? 7 : 12} md={row ? 8 : 12}>
            <Box className={classes.detailsWrapper} >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box className={classes.priceWrapper}>
                  {price && <span className={classes.currency}>{' SAR'}</span>}

                  <p className={classNames(classes.price, {[classes.notAvailable]: !price})}>
                    {price || t('priceIsNotAvailable')}
                  </p>
                </Box>

                <ActionsMenu />
              </Box>

              <p className={classes.productName}>{title || t('notAvailable')}</p>

              <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap' }}>
                <Chip className={classes.advertisorChip} icon={<AccessTimeFilledRoundedIcon />} label={moment(user?.created_at).fromNow()} variant="outlined" />
              </Stack>

              {categories && (
                <Box className={classes.tagsWrapper}>
                  {categories.map((category: AdsAndProductsCategoryModel) => (
                    <Button 
                      key={category.id} 
                      variant='outlined'
                      className={classes.cardTag}
                    >
                      {category.title.ar}
                    </Button>
                  ))}
                </Box>
              )}  
            </Box>
          </Grid> 
        </Grid>
      </Container>
    </Box>
  );
};

ProductCard.defaultProps = {
  row: true,
};

export default ProductCard;
