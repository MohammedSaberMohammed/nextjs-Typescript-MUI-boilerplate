import { FC } from 'react';
// Next
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
// Utils
import { LayoutSettings } from '@/configs/layout';
// Styles
import classes from './intro.module.scss';
import classNames from 'classnames';

const Intro: FC = () => {
  const { t } = useTranslation('home');

  const onPlayVideo = () => {
    console.log('video played');
  };

  return (
    <section className={classes.wrapper}>
      <Container maxWidth={LayoutSettings.maxWidth}>
        <Grid container spacing={2} px={0}>
          <Grid item px={0} xs={12} sm={6}>
            <Box display='flex' flexDirection='column' alignItems='flex-start'>
              <Button
                onClick={onPlayVideo}
                className={classes.player} 
                startIcon={(
                  <Image 
                    src='/icons/video-player.svg' 
                    width={50} 
                    height={50} 
                    alt='chat with advertisor' 
                  />
                )}
              >
                {t('takeALookOnBiker')}
              </Button> 
            
              <h1 className={classes.title}>
                {t('theGathering')}

                <span className={classes.highligted}>{' '}{t('theLargest')} {' '}</span>
               
                {t('forMotorCyclesParts')}
              </h1>

              <p className={classes.subTitle}>{t('introSubTitle')}</p>

              <Link href='/advertise' passHref>
                <Button
                  variant="contained"
                  color='primary'
                  className={classes.addBtn} 
                  startIcon={(
                    <Image 
                      src='/icons/add.svg' 
                      width={26} 
                      height={26} 
                      alt='create an advertisment' 
                    />
                  )}
                >
                  {t('addAdvertisment')}
                </Button>
              </Link>
            </Box>
          </Grid>                    
                      
          <Grid item xs={12} sm={6} className={classes.logoGrid}>
            <Box className={classes.logoWrapper}>
              <div className={classNames(classes.adornmentWrapper, classes.right)}>
                <Image 
                  src='/icons/white-bike.svg' 
                  width={50} 
                  height={50} 
                  alt='bike' 
                />
              </div>

              <Image
                className={classes.introLogo}
                src='/icons/logo.svg' 
                width={200} 
                height={280} 
                alt='biker logo' 
              />

              <div className={classNames(classes.adornmentWrapper, classes.left)}>
                <Image 
                  src='/icons/white-wheel.svg' 
                  width={50} 
                  height={50} 
                  alt='bike' 
                />
              </div>
            </Box>        
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Intro;
