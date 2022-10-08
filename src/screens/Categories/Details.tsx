import { FC, useMemo } from 'react';
// Next
import { useTranslation } from 'next-i18next';
// MUI
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
// Components
import Skeleton from './skeleton';
import BaseTabs from '@/components/Tabs';
import Breadcrumb from '@/components/Breadcrumb';
import PageHeader from '@/components/PageHeader/pageHeader';
import { PaginationLayout } from '@/components/Layout/Pagination/pagination';
import AdvertismentAndProductCard from '@/components/AdvertismentAndProductCard';
// Models
import { TabModel } from '@/models/components/tabs';
import { BreadCrumbItem } from '@/models/breadcrumb';
import { CategoryDetailsModel } from '@/models/pages/categories';
import { AdsAndProductsModel, AdsAndProductsQueryModel, AdsAndProductsResponse } from '@/models/adsAndProducts';
// Utils
import { Endpoints } from '@/services/apis';
import { LayoutSettings } from '@/configs/layout';
// Styles
import classes from './categories.module.scss';

const CategoriesDetails: FC<CategoryDetailsModel> = ({ ads, details, products, categoryId }) => {
  const { t } = useTranslation('categories');
  
  const breadCrumbItems: BreadCrumbItem[] = [
    { link: '/', text: t('home') },
    { link: '/categories', text: t('categories') },
    { text: details.title.ar || '' },
  ];

  const getTabLabel = (tabName: string, count: number) => {
    return (
      <p className={classes.tabName}>
        {t(tabName)}
        <span className={classes.count}>({count})</span>
      </p>
    );
  };

  const renderTabComponents = (initialData: AdsAndProductsResponse, type: string) => {
    return (
      <PaginationLayout
        initialData={initialData}
        callback={Endpoints.adsAndProducts}
        additionalPayload={{ 
          type, 
          category_id: categoryId, 
          perPage: LayoutSettings.initialPerPage 
        } as AdsAndProductsQueryModel
        }
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
    );
  };

  const tabs = useMemo(() => ([
    { 
      label: getTabLabel('products', products.total), 
      component: renderTabComponents(products, 'product') 
    },
    { 
      label: getTabLabel('ads', ads.total), 
      component: renderTabComponents(ads, 'ad') 
    },
  ] as TabModel[]), [ads, products, getTabLabel, renderTabComponents]);

  return (
    <section >
      <PageHeader 
        title={details.title.ar} 
        renderAction={() => <Breadcrumb items={breadCrumbItems} />}
      />

      <Container maxWidth={LayoutSettings.maxWidth} className={classes.wrapper}>
        <BaseTabs tabs={tabs} />
      </Container>
    </section>
  );
};

export default CategoriesDetails;
