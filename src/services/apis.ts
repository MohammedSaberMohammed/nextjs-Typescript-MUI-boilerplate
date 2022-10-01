import apisauce from 'apisauce';
import { ApiConfigs } from '@/configs/apis';
import HttpMiddleware from './HttpMiddleware';
// Models
import { BrandModel } from '@/models/brands';
import { CategoryModel } from '@/models/categories';
import { CityLookupModel } from '@/models/lookups';
import { LoginPayload, LoginResponse, SignupPayload, SignupResponse } from '@/models/auth';
import { AdsAndProductsModel, AdsAndProductsQueryModel, AdsAndProductsResponse } from '@/models/adsAndProducts';
// Models
import { serializeQueryParams } from '@/utils/global';

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
    register: (payload: SignupPayload) => Auth.post<SignupResponse>('/register', payload),
    profile: () => Auth.get('/user')
  },
  lookups: {
    cities: () => Shared.get<CityLookupModel[]>('/cities'),
    categories: () => Shared.get<CategoryModel[]>('/categories')
  },
  brands: () => Shared.get<BrandModel[]>('/brands'),
  adsAndProducts: (query: AdsAndProductsQueryModel = {}) => Shared.get<AdsAndProductsModel[] | AdsAndProductsResponse>(`/ads${serializeQueryParams(query)}`)
};

export {
  Endpoints
};
