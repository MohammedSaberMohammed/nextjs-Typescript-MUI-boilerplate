import { AdsAndProductsQueryModel, AdsAndProductsResponse } from '../adsAndProducts';
import { CategoryModel } from '../categories';

export interface SearchProps {
  _nextI18Next: any;
  categoryId: number;
  ads: AdsAndProductsResponse;  
  categoryDetails: CategoryModel;
  products: AdsAndProductsResponse;
  searchPayload: AdsAndProductsQueryModel;
}