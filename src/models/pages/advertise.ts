// Models
import { CityLookupModel } from '@/models/lookups';
import { CategoryModel } from '@/models/categories';
import { BrandModel } from '../brands';

export interface AdvertisePageModel {
  brands: BrandModel[]
  cities: CityLookupModel[];
  categories: CategoryModel[],
}