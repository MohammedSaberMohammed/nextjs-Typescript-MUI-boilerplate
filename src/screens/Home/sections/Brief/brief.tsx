import { FC } from 'react';
// Next
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
// MUI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
// Utils
import { LayoutSettings } from '@/configs/layout';
import { BriefItems, ItemModel } from './utils';
// styles
import classes from './brief.module.scss';

const Brief: FC = () => {
  const { t } = useTranslation('home');
  
  return (
    <section className={classes.wrapper}>
      <div className={classes.headerMask} >
        <Image 
          src='/images/webp/motorcycle-standing-street.webp'
          alt='brief background'
          layout="fill"
          objectFit="cover"
          quality={100}
          priority={true}
        />
      </div>

      <Container className={classes.contentWrapper} maxWidth={LayoutSettings.maxWidth}>
        <Grid container spacing={2} px={0}>
          {BriefItems.map((item: ItemModel, index: number) => (
            <Grid item px={0} xs={12} sm={4} key={index} className={classes.itemWrapper}>
              <Box  className={classes.item}>
                <Image 
                  src={item.icon} 
                  width={90} 
                  height={90} 
                  alt={t(`${item.title}`)} 
                />

                <p className={classes.title}>{t(`${item.title}`)}</p>

                <p className={classes.subTitle}>{t(`${item.subTitle}`)}</p>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default Brief;
