import apisauce from 'apisauce';
import { ApiConfigs } from '@/configs/apis';
import HttpMiddleware from './HttpMiddleware';
// Models
import { CategoryModel } from '@/models/categories';

// List of all baseURL(s)
const Shared = apisauce.create({ ...ApiConfigs.configs, baseURL: ApiConfigs.baseUrls.shared });

// Middlewares
new HttpMiddleware(Shared);

// Endpoints
const endpoints = {
  lookups: {
    categories: () => Shared.get<CategoryModel[]>('/categories')
  }
};

export default endpoints;
