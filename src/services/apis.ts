import apisauce from 'apisauce';
import { ApiConfigs } from '@/configs/apis';
import HttpMiddleware from './HttpMiddleware';
// Models
import { CategoryModel } from '@/models/categories';
import { LoginPayload, LoginResponse } from '@/models/auth';

// List of all baseURL(s)
const Shared = apisauce.create({ ...ApiConfigs.configs, baseURL: ApiConfigs.baseUrls.shared });
const Auth = apisauce.create({ ...ApiConfigs.configs, baseURL: ApiConfigs.baseUrls.auth });

// Middlewares
new HttpMiddleware(Shared);
new HttpMiddleware(Auth);

// Endpoints
const Endpoints = {
  auth: {
    login: (payload: LoginPayload) => Auth.post<LoginResponse>('/login', payload),
    profile: () => Auth.get('/user')
  },
  lookups: {
    categories: () => Shared.get<CategoryModel[]>('/categories')
  }
};

export {
  Endpoints
};
