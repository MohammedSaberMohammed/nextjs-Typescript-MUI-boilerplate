import { FC, useMemo } from 'react';
// Next
import Link from 'next/link';
import Image from 'next/image';
// MUI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
// styles
import classes from './styles.module.scss';
// Utils
import { LayoutSettings } from '@/configs/layout';

import { generateFooterLinks } from './utils';
import { useTranslation } from 'next-i18next';
import { FooterLink } from '@/models/footer';
import { Stack } from '@mui/material';
import classNames from 'classnames';
import { ClassNames } from '@emotion/react';

const Footer: FC = () => {
  const { t } = useTranslation();

  const footerLinks = useMemo(() => generateFooterLinks(t), [t]);
  
  return (
    <footer className={classes.footer}>
      <div className={classes.footerMask} />
      <Container maxWidth={LayoutSettings.containerMaxWidth} className={classes.contentWrapper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
1616561651
          </Grid>          
          
          <Grid item xs={12} sm={6} md={4} className={classes.section}>
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
          
          <Grid item xs={12} sm={6} md={4} className={classNames(classes.section, classes.importantLinks)}>
            <h6 className={classes.title}>{t('importantLinks')}</h6>

            <Stack spacing={2} direction={'column'} className={classes.details}>
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
        <div className={classes.copyRights}>

        </div>
      </Container>
    </footer>
  );
};

export default Footer;
