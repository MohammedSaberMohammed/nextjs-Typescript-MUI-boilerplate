import { APIConfigsModel } from '@/models/apiConfigs';

const msOf = (seconds: number) => seconds * 1000;

const ApiConfigs: APIConfigsModel = {
  baseUrls: {
    shared: process.env.NEXT_PUBLIC_BASE_URL || '',
    auth: `${process.env.NEXT_PUBLIC_BASE_URL}/auth`
  },
  configs: {
    timeout: msOf(50),
    headers: { 
      withCredentials: true,
      accept: 'application/json',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      'Content-Type': 'application/json',
    },
  }
};

export {
  ApiConfigs
};