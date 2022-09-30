import { AdsAndProductsResponse } from '@/models/adsAndProducts';

export interface ProductsProps {
  _nextI18Next?: any,
  pageTitle: string,
  products: AdsAndProductsResponse,
}

export interface AdsProps {
  _nextI18Next?: any,
  pageTitle: string,
  ads: AdsAndProductsResponse,
}