import { FC, useMemo } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';
// MUI
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
// Utils
import { useTranslation } from 'next-i18next';
// Models
import { PropsModel } from './model';
// Styles
import classnames from 'classnames';
import classes from './styles.module.scss';

const ProductCard: FC<PropsModel> = ({ row, advertisementMode, product }: PropsModel) =>  {
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

  const getExternalAction = useMemo(() => {
    if (advertisementMode) {
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
        className={classes.addToBasketBtn} 
        onClick={onAddToBasket}

        startIcon={<AddShoppingCartIcon />}
      >
        {t('addToBasket')}
      </Button>
    );
  }, [advertisementMode]);

  return (
    <>
      <div className={classnames(classes.cardWrapper, { [classes.row]: row })}>
        <div className={classes.imageAndActionsWrapper}>
          <Image 
            src='/images/seat.png' 
            layout='fill'
            objectFit='contain'  
            alt={name} 
          />

          <div className={classes.actionsWrapper}>
            <IconButton 
              aria-label="add to favorite list" 
              className={classes.favorite} 
              onClick={onClickFavorite}
            >
              { isFavorite ? <FavoriteOutlinedIcon style={{ color: 'red' }} /> : <FavoriteBorderIcon style={{ color: 'white' }}/>}
            </IconButton>

            <div className={classnames(classes.externalActionsWrapper, { [classes.advertisementMode]: advertisementMode })}>{getExternalAction}</div>
          </div>
        </div>

        <div className={classes.detailsWrapper}>
          <p className={classes.price}>{price ? `${price} SAR` : t('notAvailable') }</p>
          <p className={classes.productName}>{name || t('notAvailable')}</p>

          {advertisementMode && advertisor && (
            <div className={classes.advertisorInfo}>
              {/* <div className={advertisorName}></div>
              <div className={advertismentDate}></div> */}
            </div>
          )}

          {tags && (
            <div className={classes.tagsWrapper}>
              {tags.map((tag: string) => <button>{tag}</button>)}
            </div>
          )}
        
        </div>
      </div>
    </>
    
  );
};

ProductCard.defaultProps = {
  row: false,
  markAsFavorite: false,
  advertisementMode: true
};

export default ProductCard;
