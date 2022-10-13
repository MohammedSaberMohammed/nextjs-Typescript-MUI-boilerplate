import { FC } from 'react';
// Next
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
// MUI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// Components
import AdCard from './Card/card';
import PageHeader from '@/components/PageHeader/pageHeader';
// Utils
import { LayoutSettings } from '@/configs/layout';
// styles
import classes from './myAds.module.scss';

const MyAds: FC = () => {
  const { t } = useTranslation('my-ads');

  const adsList = [
    {
      id: 1,
      user_id: 1,
      title: 'قفازات دراجة نارية زوج واحد',
      price: '22.5',
      description: 'string',
      published: true,
      status: 1,
      type: 'ad',
      created_at: '15-03-1995',
      updated_at: 'string',
      isFavorite: false,
      image: {
        id: 1,
        uuid: 'string',
        name: 'string',
        file_name: 'string',
        mime_type: 'string',
        size: 1,
        generated_conversions: [''],
        order_column: 1,
        created_at: 'string',
        updated_at: 'string',
        url: 'string',
        large: '/images/10.jpg',
        medium: 'string',
        small: 'string',
        collection: 'string'
      },
      categories: [
        {
          id: 1,
          slug: 'string',
          description: null,
          font_icon: null,
          type: 'string',
          parent_id: null,
          created_at: null,
          updated_at: null,
          icon: null,
          title: {
            ar: 'قفازات',
            en: 'string'
          },
          pivot: {
            taxable_id: 1,
            taxonomy_id: 1,
            taxable_type: 'string'
          },
        }
      ],
    },    {
      id: 1,
      user_id: 1,
      title: 'قفازات دراجة نارية زوج واحد',
      price: '22.5',
      description: 'string',
      published: true,
      status: 1,
      type: 'ad',
      created_at: '15-03-1995',
      updated_at: 'string',
      isFavorite: false,
      image: {
        id: 1,
        uuid: 'string',
        name: 'string',
        file_name: 'string',
        mime_type: 'string',
        size: 1,
        generated_conversions: [''],
        order_column: 1,
        created_at: 'string',
        updated_at: 'string',
        url: 'string',
        large: '/images/10.jpg',
        medium: 'string',
        small: 'string',
        collection: 'string'
      },
      categories: [
        {
          id: 1,
          slug: 'string',
          description: null,
          font_icon: null,
          type: 'string',
          parent_id: null,
          created_at: null,
          updated_at: null,
          icon: null,
          title: {
            ar: 'قفازات',
            en: 'string'
          },
          pivot: {
            taxable_id: 1,
            taxonomy_id: 1,
            taxable_type: 'string'
          },
        }
      ],
    },    {
      id: 1,
      user_id: 1,
      title: 'قفازات دراجة نارية زوج واحد',
      price: '22.5',
      description: 'string',
      published: true,
      status: 1,
      type: 'ad',
      created_at: '15-03-1995',
      updated_at: 'string',
      isFavorite: false,
      image: {
        id: 1,
        uuid: 'string',
        name: 'string',
        file_name: 'string',
        mime_type: 'string',
        size: 1,
        generated_conversions: [''],
        order_column: 1,
        created_at: 'string',
        updated_at: 'string',
        url: 'string',
        large: '/images/10.jpg',
        medium: 'string',
        small: 'string',
        collection: 'string'
      },
      categories: [
        {
          id: 1,
          slug: 'string',
          description: null,
          font_icon: null,
          type: 'string',
          parent_id: null,
          created_at: null,
          updated_at: null,
          icon: null,
          title: {
            ar: 'قفازات',
            en: 'string'
          },
          pivot: {
            taxable_id: 1,
            taxonomy_id: 1,
            taxable_type: 'string'
          },
        }
      ],
    },    {
      id: 1,
      user_id: 1,
      title: 'قفازات دراجة نارية زوج واحد',
      price: '22.5',
      description: 'string',
      published: true,
      status: 1,
      type: 'ad',
      created_at: '15-03-1995',
      updated_at: 'string',
      isFavorite: false,
      image: {
        id: 1,
        uuid: 'string',
        name: 'string',
        file_name: 'string',
        mime_type: 'string',
        size: 1,
        generated_conversions: [''],
        order_column: 1,
        created_at: 'string',
        updated_at: 'string',
        url: 'string',
        large: '/images/10.jpg',
        medium: 'string',
        small: 'string',
        collection: 'string'
      },
      categories: [
        {
          id: 1,
          slug: 'string',
          description: null,
          font_icon: null,
          type: 'string',
          parent_id: null,
          created_at: null,
          updated_at: null,
          icon: null,
          title: {
            ar: 'قفازات',
            en: 'string'
          },
          pivot: {
            taxable_id: 1,
            taxonomy_id: 1,
            taxable_type: 'string'
          },
        }
      ],
    },    {
      id: 1,
      user_id: 1,
      title: 'قفازات دراجة نارية زوج واحد',
      price: '22.5',
      description: 'string',
      published: true,
      status: 1,
      type: 'ad',
      created_at: '15-03-1995',
      updated_at: 'string',
      isFavorite: false,
      image: {
        id: 1,
        uuid: 'string',
        name: 'string',
        file_name: 'string',
        mime_type: 'string',
        size: 1,
        generated_conversions: [''],
        order_column: 1,
        created_at: 'string',
        updated_at: 'string',
        url: 'string',
        large: '/images/10.jpg',
        medium: 'string',
        small: 'string',
        collection: 'string'
      },
      categories: [
        {
          id: 1,
          slug: 'string',
          description: null,
          font_icon: null,
          type: 'string',
          parent_id: null,
          created_at: null,
          updated_at: null,
          icon: null,
          title: {
            ar: 'قفازات',
            en: 'string'
          },
          pivot: {
            taxable_id: 1,
            taxonomy_id: 1,
            taxable_type: 'string'
          },
        }
      ],
    },    {
      id: 1,
      user_id: 1,
      title: 'قفازات دراجة نارية زوج واحد',
      price: '22.5',
      description: 'string',
      published: true,
      status: 1,
      type: 'ad',
      created_at: '15-03-1995',
      updated_at: 'string',
      isFavorite: false,
      image: {
        id: 1,
        uuid: 'string',
        name: 'string',
        file_name: 'string',
        mime_type: 'string',
        size: 1,
        generated_conversions: [''],
        order_column: 1,
        created_at: 'string',
        updated_at: 'string',
        url: 'string',
        large: '/images/10.jpg',
        medium: 'string',
        small: 'string',
        collection: 'string'
      },
      categories: [
        {
          id: 1,
          slug: 'string',
          description: null,
          font_icon: null,
          type: 'string',
          parent_id: null,
          created_at: null,
          updated_at: null,
          icon: null,
          title: {
            ar: 'قفازات',
            en: 'string'
          },
          pivot: {
            taxable_id: 1,
            taxonomy_id: 1,
            taxable_type: 'string'
          },
        }
      ],
    },
  ];

  return (
    <section>
      <PageHeader 
        title={t('pageTitle')} 
        subTitle={t('pageDescription')}
      />
      
      <Container maxWidth={LayoutSettings.maxWidth} className={classes.contentWrapper}>
        <Grid container spacing={5} px={0}>
          <Grid item xs={12} className={classes.headerWrapper}>
            <Box>
              <h2 className={classes.bodyTitle}>
                {t('pageTitle')}

                <span className={classes.count}>(6)</span>
              </h2>

              <p className={classes.subTitle}>{t('subTitle')}</p>
            </Box>

            <div className={classes.advertiseLink}>
              <Link href='/advertise' passHref>
                <Button 
                  fullWidth
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
            </div>
          </Grid>

          {adsList.map((ad, index) => (
            <Grid key={index} item xs={12} sm={6}>
              <AdCard ad={ad} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default MyAds;
