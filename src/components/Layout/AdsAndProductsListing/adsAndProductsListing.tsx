import { FC, useEffect, useState } from 'react';
// Next
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
// MUI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
// Configs
import { LayoutSettings } from '@/configs/layout';
// Styles
import classes from './adsAndProductsListing.module.scss';
// Components
import SelectAutocomplete from '@/components/Form/Controls/SelectAutocomplete';
import { StaticLookupRadio } from '@/components/Form/Controls/StaticLookupRadio';
import { PaginationLayout } from '@/components/Layout/Pagination/pagination';
// Models
import { CategoryModel } from '@/models/categories';
import { SelectAutocompleteValue } from '@/models/SelectAutocomplete';
import { BaseLookupOptionModel, CityLookupModel } from '@/models/lookups';
import { PaginationExportedDataModel, PaginationResponse } from '@/models/Pagination';
// helpers
import { generateLookups } from './utils';

interface Props {
  type: 'product' | 'ad',
  orderBy?: string,
  showOrderByFilter?: boolean,
  initialData: PaginationResponse,
  // eslint-disable-next-line no-unused-vars
  children: (data: PaginationExportedDataModel) => any,
  // eslint-disable-next-line no-unused-vars
  callback: (query?: any) => any,
  additionalPayload?: any,
  cities: CityLookupModel[],
  categories: CategoryModel[],
}

const AdsAndProductsListing: FC<Props> = ({ 
  type, 
  initialData, 
  callback, 
  children, 
  categories, 
  cities,
  orderBy,
  additionalPayload,
  showOrderByFilter
}) =>  {
  const { t } = useTranslation('productsAndAds');
  const [generaredLookups, setGeneratedLookup] = useState<{orderLookup: BaseLookupOptionModel[]}>({
    orderLookup: [],
  });
  const [filters, setFilters] = useState({
    categories: [],
    cities: [],
    orderBy: orderBy || '',
    type
  });

  useEffect(() => {
    const { orderLookup } = generateLookups(t);

    setGeneratedLookup(() => ({
      ...generaredLookups,
      orderLookup,
    }));
  }, []);

  useEffect(() => {
    if(additionalPayload && Object.keys(additionalPayload).length) {
      setFilters(() => ({
        ...filters,
        ...additionalPayload
      }));
    }
  }, [additionalPayload]);

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

  return (
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

          {showOrderByFilter && (
            <div className={classes.filterWrapper}>
              <StaticLookupRadio
                name='orderBy'
                label={t('orderBy')}
                value={filters.orderBy}
                onChange={onChangeFilterType}
                lookup={generaredLookups.orderLookup}
              />
            </div>            
          )}
        </Grid>
        
        <Grid item px={0} xs={12} sm={8} md={9}>
          <PaginationLayout
            initialData={initialData}
            additionalPayload={filters}
            callback={callback}
          >
            {(data: PaginationExportedDataModel) => children(data)}
          </PaginationLayout>
        </Grid>
      </Grid>
    </Container>
  );
};

AdsAndProductsListing.defaultProps = {
  orderBy: '',

  showOrderByFilter: true,

  additionalPayload: {},

  callback() {},
  children() {},
};

export default AdsAndProductsListing;
