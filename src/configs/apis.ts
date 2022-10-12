import { APIConfigsModel } from '@/models/apiConfigs';

const msOf = (seconds: number) => seconds * 1000;

const ApiConfigs: APIConfigsModel = {
  baseUrls: {
    baseOnly: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    shared: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`,
    auth: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth`
  },
  configs: {
    timeout: msOf(50),
    withCredentials: true,
    xsrfHeaderName: 'X-XSRF-TOKEN',
    headers: { 
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }
};

export {
  ApiConfigs
};