import { AdsAndProductsModel } from '@/models/adsAndProducts';

export interface PropsModel {
  product: AdsAndProductsModel,
  row?: boolean,
  markAsFavorite?: boolean,
}
