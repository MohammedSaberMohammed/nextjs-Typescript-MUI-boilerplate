// Models
import { CityLookupModel } from '@/models/lookups';
import { CategoryModel } from '@/models/categories';

export interface AdvertisePageModel {
  cities: CityLookupModel[];
  categories: CategoryModel[]
}