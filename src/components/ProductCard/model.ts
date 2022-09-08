import { ProductItem } from '@/models/product';

export interface PropsModel {
  product: ProductItem,
  row?: boolean,
  markAsFavorite?: boolean,
}
