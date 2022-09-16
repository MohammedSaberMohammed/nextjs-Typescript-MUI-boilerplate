import { FC } from 'react';
// Next
import Image from 'next/image';
// MUI
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// Utils
import { LayoutSettings } from '@/configs/layout';
// Models
import { PageHeaderProps } from './model';
// styles
import classes from './styles.module.scss';

const PageHeader: FC<PageHeaderProps> = ({
  title,
  subTitle,
  backgroundSrc,
  backgroundAlt,
  prefixBackgroundSrc,
  prefixBackgroundAlt
}) => {
  return (
    <section className={classes.pageHeader}>
      <div className={classes.headerMask} >
        <Image 
          src={backgroundSrc || ''} 
          alt={backgroundAlt || ''}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      <Container className={classes.contentWrapper} maxWidth={LayoutSettings.maxWidth}>
        <Box flexDirection='column' display='flex' alignItems='center' justifyContent='center' className={classes.textWrapper}>
          {title && <h1 className={classes.title}>{title}</h1>}
          {subTitle && <p className={classes.subTitle}>{subTitle}</p>}
        </Box>

        <div className={classes.imageWrapper}>
          <Image 
            src={prefixBackgroundSrc || ''} 
            alt={prefixBackgroundAlt || ''}
            width={100}
            height={90}
          />
        </div>
      </Container>
    </section>
  );
};

PageHeader.defaultProps = {
  title: '',
  subTitle: '',
  backgroundSrc: '/images/motorcycle-standing-street.png',
  backgroundAlt: 'page header background',
  prefixBackgroundSrc: '/icons/dots.svg',
  prefixBackgroundAlt: 'page header icon background',
};

export default PageHeader;
