import { FC, useEffect, useState } from 'react';
// Next
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
// MUI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
// Components
import Skeleton from './skeleton';
import AdvertismentAndProductCard from '@/components/AdvertismentAndProductCard';
// Models
import { ProductsProps } from '@/models/pages/productsAndAds';
import PageHeader from '@/components/PageHeader/pageHeader';
import { AdsAndProductsModel } from '@/models/adsAndProducts';
// Configs
import { LayoutSettings } from '@/configs/layout';
// Styles
import classes from './products.module.scss';
import SelectAutocomplete from '@/components/Form/Controls/SelectAutocomplete';
import { SelectAutocompleteValue } from '@/models/SelectAutocomplete';
import { StaticLookupRadio } from '@/components/Form/Controls/StaticLookupRadio';
import { PaginationLayout } from '@/components/Layout/Pagination/pagination';
import { Endpoints } from '@/services/apis';
import { generateLookups } from './utils';
import { BaseLookupOptionModel } from '@/models/lookups';

const Products: FC<ProductsProps> = ({ products, pageTitle, categories, cities }) =>  {
  const { t } = useTranslation('products');
  const [generaredLookups, setGeneratedLookup] = useState<{orderLookup: BaseLookupOptionModel[]}>({
    orderLookup: [],
  });
  const [filters, setFilters] = useState({
    categories: [],
    cities: [],
    orderBy: '',
    type: 'product'
  });

  useEffect(() => {
    const { orderLookup } = generateLookups(t);

    setGeneratedLookup(() => ({
      ...generaredLookups,
      orderLookup,
    }));
  }, []);

  const onChangeFilter = (name: string, value: SelectAutocompleteValue) => {
    setFilters(() => ({
      ...filters,
      [name]: value
    }));
  };  
  
  const onChangeFilterType = (value: string | number, name?: string) => {
    setFilters(() => ({
      ...filters,
      [name || 'filterType']: value
    }));
  };

  console.log({ filters, products });

  return (
    <section>
      <PageHeader 
        title={t(pageTitle)} 
        renderAction={() => (
          <Breadcrumbs 
            aria-label="breadcrumb"
            separator={
              <Image 
                src={'/icons/arrow-square-left.svg'} 
                width={24}
                height={24}
                alt='separator'
              />
            }
          >
            <Link href="/">
              <a className='enabled-breadcrumb'>{t('home')}</a>
            </Link>
            <Link href="/products">
              <a className='enabled-breadcrumb'>{t('store')}</a>
            </Link>
            <Typography className='disabled-breadcrumb'>{t(pageTitle)}</Typography>
          </Breadcrumbs>
        )}
      />

      <Container className={classes.wrapper} maxWidth={LayoutSettings.maxWidth}>
        <Grid container spacing={5} px={0}>
          <Grid item px={0} xs={12} sm={4} md={3}>
            <Box className={classes.searchHeader}>
              <Image 
                src='/icons/filter.svg' 
                width={24}
                height={24}  
                alt='filter icon' 
              />

              <h4 className={classes.title}>{t('filterProducts')}</h4>
            </Box>

            <div className={classes.filterWrapper}>
              <SelectAutocomplete 
                name='categories'
                value={filters.categories}
                multiple
                fancySelect
                label={t('categories')}
                onChange={onChangeFilter}
                lookup={categories}
                labelTargetKey='title.ar'
              />
            </div>            
            
            <div className={classes.filterWrapper}>
              <SelectAutocomplete 
                name='cities'
                value={filters.cities}
                multiple
                fancySelect
                label={t('cities')}
                onChange={onChangeFilter}
                lookup={cities}
                labelTargetKey='name'
              />
            </div>

            <div className={classes.filterWrapper}>
              <StaticLookupRadio
                name='orderBy'
                label={t('orderBy')}
                value={filters.orderBy}
                onChange={onChangeFilterType}
                lookup={generaredLookups.orderLookup}
              />
            </div>            
          </Grid>
          <Grid item px={0} xs={12} sm={8} md={9}>

            <PaginationLayout
              initialData={products}
              // perPage={3}
              additionalPayload={filters}
              callback={Endpoints.adsAndProducts}
            >
              {({ data, isLoading }) => (
                <Grid container spacing={2} px={0}>
                  {isLoading ? <Skeleton /> : data.map((product: AdsAndProductsModel) => (
                    <Grid key={product.id} item px={0} xs={12} md={6} lg={4}>
                      <AdvertismentAndProductCard
                        product={product}
                      />
                      
                    </Grid>
                  ))}
                </Grid>
              )}
            </PaginationLayout>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Products;
