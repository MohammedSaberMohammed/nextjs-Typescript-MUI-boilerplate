import { AdsAndProductsModel } from './adsAndProducts';
import { FileModel } from './files';

export interface CreateAdPayload {
  city_id: string;
  price: string;
  brand_id: string;
  title: string;
  description: string;
  images: File[] | FileModel[];
  categories: number[];
  remove_images?: number[];
  published?: boolean;
}

export interface CreateAdResponse extends AdsAndProductsModel {
  errors?: { [key: string]: string[] };
  message?: string
}
