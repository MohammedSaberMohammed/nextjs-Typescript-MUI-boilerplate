import apisauce from 'apisauce';
import { ApiConfigs } from '@/configs/apis';
import HttpMiddleware from './HttpMiddleware';
// Models
import { BrandModel } from '@/models/brands';
import { CategoryModel } from '@/models/categories';
import { CityLookupModel } from '@/models/lookups';
import { LoginPayload, LoginResponse, ResetPasswordPayload, ResetPasswordResponse, ValidateOTPPayload, ValidateOTPResponse, SendOTPCodePayload, SendOTPCodeRespnse, SignupPayload, SignupResponse } from '@/models/auth';
import { AdsAndProductsDetailsResponse, AdsAndProductsModel, AdsAndProductsQueryModel, AdsAndProductsResponse } from '@/models/adsAndProducts';
// Models
import { serializeQueryParams } from '@/utils/global';
import { CreateAdPayload } from '@/models/adsCrud';

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
    profile: () => Auth.get('/user'),
    
    resetPassword: {
      reset: (payload: ResetPasswordPayload) => Auth.post<ResetPasswordResponse>('/reset-password', payload),
    }
  },
  otp: {
    send: (payload: SendOTPCodePayload) => Auth.post<SendOTPCodeRespnse>('/send-code', payload),
    validate: (payload: ValidateOTPPayload) => Auth.post<ValidateOTPResponse>('/verify-code', payload),
  },
  lookups: {
    cities: () => Shared.get<CityLookupModel[]>('/cities'),
    categories: () => Shared.get<CategoryModel[]>('/categories')
  },
  brands: () => Shared.get<BrandModel[]>('/brands'),
  adsAndProducts: (query: AdsAndProductsQueryModel = {}) => Shared.get<AdsAndProductsModel[] | AdsAndProductsResponse>(`/ads${serializeQueryParams(query)}`),
  adDetails: (id: string) => Shared.get<AdsAndProductsDetailsResponse>(`/ads/${id}`),
  ads: {
    create: (payload: FormData) => Shared.post<AdsAndProductsModel>('/ads', payload, 
      { 
        headers: {
          'Content-Type': 'multipart/form-data'
        } 
      }),
  }
};

export {
  Endpoints
};
