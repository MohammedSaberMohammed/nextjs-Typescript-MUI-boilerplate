import { CategoryModel } from '@/models/categories';
import { AdsAndProductsDetailsResponse, AdsAndProductsResponse } from '@/models/adsAndProducts';
import { CityLookupModel } from '@/models/lookups';

export interface ProductsProps {
  _nextI18Next?: any,
  pageTitle: string,
  orderBy?: string,
  cities: CityLookupModel[],
  categories: CategoryModel[],
  products: AdsAndProductsResponse,
}

export interface AdsProps {
  _nextI18Next?: any,
  pageTitle: string,
  orderBy?: string,
  cities: CityLookupModel[],
  categories: CategoryModel[],
  ads: AdsAndProductsResponse,
}

export interface AdAndProductDetails {
  _nextI18Next?: any,
  breadcrumbTitle: string,
  details: AdsAndProductsDetailsResponse
}