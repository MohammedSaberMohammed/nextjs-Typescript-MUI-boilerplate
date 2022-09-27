import { AdsAndProductsModel } from '@/models/adsAndProducts';
import { BrandModel } from '@/models/brands';
import { CategoryModel } from '@/models/categories';

export interface HomeProps {
  _nextI18Next?: any,
  brands: BrandModel[],
  categories: CategoryModel[],
  newAds: AdsAndProductsModel[],
  newestProducts: AdsAndProductsModel[],
  mostViewedAds: AdsAndProductsModel[],
  bestSellingProducts: AdsAndProductsModel[],
}