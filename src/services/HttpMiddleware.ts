import { DevelopmentEnv } from '@/configs/development';
import { ApisauceInstance } from 'apisauce';

// import ResponseErrorMiddleware from './ResponseErrorMiddleware';

export default class HttpMiddleware {
  public api: ApisauceInstance;

  constructor(api: ApisauceInstance) {
    this.api = api;

    this.handleRequest();
    this.handleResponse();
  }

  handleRequest() {
    this.api.addRequestTransform(request => {
      const inDevelopment = process.env.NODE_ENV === 'development';
      
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem(DevelopmentEnv.appToken);
      
        console.log('insideMiddddddddd', token);
        if(inDevelopment) {
  
          if(token) {
  
            request.headers.Authorization=  `Bearer ${token}`;
          }
        }
      }

      return request;
    });
  }

  handleResponse() {
    this.api.axiosInstance.interceptors.response.use(
      response => response,
      error => Promise.reject(error)
    );

    this.api.addResponseTransform(response => {   

      // (new ResponseErrorMiddleware({ response })).watchForErrors();
      return response;
    });
  }
}
