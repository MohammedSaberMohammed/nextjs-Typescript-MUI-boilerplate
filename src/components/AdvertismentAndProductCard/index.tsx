import { FC, useMemo } from 'react';
// Next
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
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
import classNames from 'classnames';
import classes from './styles.module.scss';
import { AdsAndProductsCategoryModel } from '@/models/adsAndProducts';

const ProductCard: FC<PropsModel> = ({ row, product }: PropsModel) =>  {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { data: session } = useSession();
  const { price, image, title, advertisor, categories, isFavorite } = product;

  const isAuthenticated = useMemo(() => Boolean(session), [session]);

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
            startIcon={(
              <Image 
                src='/icons/white-chat.svg' 
                width={24} 
                height={24} 
                alt='chat with advertisor' 
              />
            )}
          >
            {t('chat')}
          </Button>

          <Button 
            variant="contained"
            onClick={onCall} 
            className={classes.callBtn} 
            startIcon={(
              <Image 
                src='/icons/call.svg' 
                width={24} 
                height={24} 
                alt='advertisor call' 
              />
            )}
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
        startIcon={(
          <Image 
            src='/icons/basket.svg' 
            width={24} 
            height={24} 
            alt='add to basket' 
          />
        )}
      >
        {t('addToBasket')}
      </Button>
    );
  }, [advertisor]);

  return (
    <Box
      sx={{ direction: 'ltr' }}
      onClick={onCardClick}
      className={classNames(classes.cardWrapper, { [classes.row]: row })}
    >
      <Container disableGutters>
        <Grid sx={{padding: 0}} container spacing={row ? 2 : 0}>
          <Grid item sx={{padding: 0}} xs={12} sm={row ? 5 : 12} md={row ? 4 : 12}>
            <Box className={classes.imageAndActionsWrapper}>
              <Image 
                src={image.large} 
                layout='fill'
                objectFit='cover'  
                alt={title} 
              />

              <Box className={classNames(classes.actionsWrapper, {[classes.row]: row})}>
                {!row && (
                  <IconButton 
                    aria-label="add to favorite list" 
                    className={classes.favorite} 
                    onClick={onClickFavorite}
                  >
                    { isFavorite ? <FavoriteOutlinedIcon style={{ color: 'red' }} /> : (
                      <Image 
                        src='/icons/white-heart.svg' 
                        width={24} 
                        height={24} 
                        alt='not favorite' 
                      />
                    )}
                  </IconButton>
                )}

                <Box className={classNames(classes.externalActionsWrapper, { [classes.advertisementMode]: !advertisor })}>{getExternalAction}</Box>
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

              <p className={classes.productName}>{title || t('notAvailable')}</p>

              {advertisor && (
                <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap' }}>
                  <Chip className={classes.advertisorChip} icon={<AccountCircleRoundedIcon />} label={advertisor.name} variant="outlined" />
                  <Chip className={classes.advertisorChip} icon={<AccessTimeFilledRoundedIcon />} label={advertisor.date} variant="outlined" />
                </Stack>
              )}

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
  row: false,
  markAsFavorite: false,
};

export default ProductCard;
