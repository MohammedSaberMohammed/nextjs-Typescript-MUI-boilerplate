import { FC, useMemo } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';
// MUI
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
// Utils
import { useTranslation } from 'next-i18next';
// Models
import { PropsModel } from './model';
// Styles
import classnames from 'classnames';
import classes from './styles.module.scss';
import classNames from 'classnames';

const ProductCard: FC<PropsModel> = ({ row, product }: PropsModel) =>  {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { price, name, advertisor, tags, isFavorite } = product;

  const isAuthenticated = useMemo(() => false, [/* Some Prop Here */]);

  // const isFavoriteCard = useMemo(() => {}, [isFavorite, markAsFavorite])

  const onClickFavorite = () => {
    if(isAuthenticated) {
      // Todo: call parent
    } else {
      router.push('/login');
      // Todo: [Push Message to notify that the user needs to be logged in]
    }
  };

  const onAddToBasket = () => {
    if(isAuthenticated) {
      // Todo: call parent
    } else {
      router.push('/login');
      // Todo: [Push Message to notify that the user needs to be logged in]
    }
  };

  const onCall = () => {
    if(isAuthenticated) {
      // Todo: call parent
    } else {
      router.push('/login');
      // Todo: [Push Message to notify that the user needs to be logged in]
    }
  };

  const onChat = () => {
    if(isAuthenticated) {
      // Todo: call parent
    } else {
      router.push('/login');
      // Todo: [Push Message to notify that the user needs to be logged in]
    }
  };

  const onCardClick = () => {
    // Todo: Go to details page
  };

  const getExternalAction = useMemo(() => {
    if (advertisor) {
      return (
        <>
          <Button 
            variant="outlined"
            onClick={onChat}
            className={classes.chatBtn} 
            startIcon={<QuestionAnswerOutlinedIcon />}
          >
            {t('chat')}
          </Button>

          <Button 
            variant="contained"
            onClick={onCall} 
            className={classes.callBtn} 
            startIcon={<PhoneEnabledOutlinedIcon />}
          >
            {t('call')}
          </Button>
        </>
      );
    }

    return (
      <Button 
        fullWidth 
        variant="outlined" 
        onClick={onAddToBasket}
        className={classes.addToBasketBtn} 
        startIcon={<AddShoppingCartIcon />}
      >
        {t('addToBasket')}
      </Button>
    );
  }, [advertisor]);

  return (
    <Box 
      onClick={onCardClick}
      className={classnames(classes.cardWrapper, { [classes.row]: row })}
    >
      <Container disableGutters>
        <Grid sx={{padding: 0}} container spacing={2}>
          <Grid item sx={{padding: 0}} xs={12} sm={row ? 5 : 12} md={row ? 4 : 12}>
            <Box className={classes.imageAndActionsWrapper}>
              <Image 
                src='/images/seat.png' 
                layout='fill'
                objectFit='contain'  
                alt={name} 
              />

              <Box className={classnames(classes.actionsWrapper, {[classes.row]: row})}>
                {!row && (
                  <IconButton 
                    aria-label="add to favorite list" 
                    className={classes.favorite} 
                    onClick={onClickFavorite}
                  >
                    { isFavorite ? <FavoriteOutlinedIcon style={{ color: 'red' }} /> : <FavoriteBorderIcon style={{ color: 'white' }}/>}
                  </IconButton>
                )}

                <Box className={classnames(classes.externalActionsWrapper, { [classes.advertisementMode]: advertisor })}>{getExternalAction}</Box>
              </Box>
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

                {row && (
                  <IconButton 
                    aria-label="add to favorite list" 
                    className={classes.favorite} 
                    onClick={onClickFavorite}
                  >
                    { isFavorite ? <FavoriteOutlinedIcon style={{ color: 'red' }} /> : <FavoriteBorderIcon color='primary'/>}
                  </IconButton>
                )}
              </Box>

              <p className={classes.productName}>{name || t('priceIsNotAvailable')}</p>

              {advertisor && (
                <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap' }}>
                  <Chip className={classes.advertisorChip} icon={<AccountCircleRoundedIcon />} label={advertisor.name} variant="outlined" />
                  <Chip className={classes.advertisorChip} icon={<AccessTimeFilledRoundedIcon />} label={advertisor.date} variant="outlined" />
                </Stack>
              )}

              {tags && (
                <Box className={classes.tagsWrapper}>
                  {tags.map((tag: string, index: number) => (
                    <Button 
                      key={index} 
                      variant='outlined'
                      className={classes.cardTag}
                    >
                      {tag}
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
  row: false,
  markAsFavorite: false,
};

export default ProductCard;
