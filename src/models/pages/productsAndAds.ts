import { CategoryModel } from '@/models/categories';
import { AdsAndProductsResponse } from '@/models/adsAndProducts';
import { CityLookupModel } from '@/models/lookups';

export interface ProductsProps {
  _nextI18Next?: any,
  pageTitle: string,
  cities: CityLookupModel[],
  categories: CategoryModel[],
  products: AdsAndProductsResponse,
}

export interface AdsProps {
  _nextI18Next?: any,
  pageTitle: string,
  cities: CityLookupModel[],
  categories: CategoryModel[],
  ads: AdsAndProductsResponse,
}