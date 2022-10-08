import { LoginResponse } from './auth';
import { PaginationResponse } from './Pagination';

 interface AdsAndProductsImage {
  id: number,
  uuid: string,
  name: string,
  file_name: string,
  mime_type: string,
  size: number,
  generated_conversions: [],
  order_column: number,
  created_at: string,
  updated_at: string,
  url: string,
  large: string,
  medium: string,
  small: string,
  collection: string
} 

export interface AdsAndProductsCategoryModel {
  id: number,
  slug: string,
  description: null,
  font_icon: null,
  type: string,
  parent_id: null,
  created_at: null,
  updated_at: null,
  icon: null,
  title: {
    ar: string,
    en: string
  },
  pivot: {
    taxable_id: number,
    taxonomy_id: number,
    taxable_type: string
  },
}

export interface AdsAndProductsModel {
  id: number,
  user_id: number,
  title: string,
  price: string,
  description: string,
  published: true,
  status: number,
  type: string,
  created_at: string,
  updated_at: string,
  isFavorite: false,
  image: AdsAndProductsImage,
  categories: AdsAndProductsCategoryModel[],
  user?: LoginResponse
}

export interface AdsAndProductsResponse extends PaginationResponse {
  data: AdsAndProductsModel[],
}

export interface AdsAndProductsQueryModel {
  order?: 'asc' | 'desc',
  type?: 'ad' | 'product',
  orderBy?: string,
  search?: string,
  limit?: number, 
  perPage?: number,
  page?: number,
  city_id?: number | string,
  cities?: (string | number)[],  
  category_id?: number | string,
  categories?: (string | number)[],
}

export interface AdsAndProductsDetailsResponse extends AdsAndProductsModel {
  city_id: number,
  media: AdsAndProductsImage[]
}