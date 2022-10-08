import { AdsAndProductsResponse } from '../adsAndProducts';
import { CategoryModel } from '../categories';

export interface CategoriesListModel {
  categories: CategoryModel[]
}

export interface CategoryDetailsModel {
  _nextI18Next: any;
  categoryId: number;
  details: CategoryModel;
  ads: AdsAndProductsResponse;  
  products: AdsAndProductsResponse;
}