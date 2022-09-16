import { FC, useMemo } from 'react';
// Next
import Link from 'next/link';
import Image from 'next/image';
// Translations
import { useTranslation } from 'next-i18next';
// MUI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
// styles
import classNames from 'classnames';
import classes from './styles.module.scss';
// Utils
import { LayoutSettings } from '@/configs/layout';
import { generateFooterLinks } from './utils';
// Models
import { FooterLink } from '@/models/footer';

const Footer: FC = () => {
  const { t } = useTranslation();

  const footerLinks = useMemo(() => generateFooterLinks(t), [t]);
  
  return (
    <footer className={classes.footer}>
      <div className={classes.footerMask} />

      <Container maxWidth={LayoutSettings.maxWidth} className={classes.contentWrapper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={5} className={classNames(classes.section, classes.footerDescriptionWrapper)}>
            <Image src='/icons/logo-with-text.svg' width={140} height={89} alt='Bike logo' />
         
            <p className={classes.footerDescription}>{t('footerDescription')}</p>
          
            <div className={classes.socialLinks}>

              <IconButton
                color="inherit"
                disableFocusRipple
                disableRipple
                className={classes.btn}
              >
                <FacebookRoundedIcon />
              </IconButton>
              
              <IconButton
                color="inherit"
                disableFocusRipple
                disableRipple
                className={classes.btn}
              >
                <TwitterIcon />
              </IconButton>

              <IconButton
                color="inherit"
                disableFocusRipple
                disableRipple
                className={classes.btn}
              >
                <FacebookRoundedIcon />
              </IconButton>

            </div>
          </Grid>          
          
          <Grid item xs={12} sm={6} md={5} className={classes.section}>
            <h6 className={classes.title}>{t('siteSections')}</h6>
            
            <Container disableGutters>
              <Grid container spacing={2} className={classes.details}>
                {footerLinks.sections.map((item: FooterLink, index: number) => (
                  <Grid key={`${item.title}_${index}`} item xs={6} sm={6}>
                    <Link href={item.link} passHref>
                      <a className={classes.menuLink}>
                        <Image 
                          src={'/icons/arrow-square-left.svg'} 
                          width={30}
                          height={30}
                          alt={`${item.title}-image`}
                        />

                        <Box sx={{ mx: 1 }}>{item.title}</Box>
                      </a>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Grid>          
          
          <Grid item xs={12} sm={6} md={2} className={classNames(classes.section, classes.importantLinks)}>
            <Stack spacing={2} direction={'column'} className={classes.details}>

              <h6 className={classes.title}>{t('importantLinks')}</h6>
              
              {footerLinks.important.map((item: FooterLink, index: number) => (
                <Link key={`${item.title}_${index}`} href={item.link} passHref>
                  <a className={classes.menuLink}>
                    <Image 
                      src={'/icons/arrow-square-left.svg'} 
                      width={30}
                      height={30}
                      alt={`${item.title}-image`}
                    />

                    <Box sx={{ mx: 1 }}>{item.title}</Box>
                  </a>
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <p className={classes.copyRights}>
          {t('allRightsReserveredFor')}
          <span className={classes.siteName}>{' Biker '}</span>
          {t('sitePurpose')}
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
