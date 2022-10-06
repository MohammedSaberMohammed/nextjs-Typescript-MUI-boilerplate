import { FileModel } from './files';

export interface CreateAdPayload {
  city_id: number;
  price: number;
  brand_id: number;
  title: string;
  description: string;
  images: File[] | FileModel[];
  categories: number[];
  remove_images: number[];
  published?: boolean;
}