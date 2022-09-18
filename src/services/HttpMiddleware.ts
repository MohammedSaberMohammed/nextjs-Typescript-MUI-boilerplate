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
    this.api.addRequestTransform(request => request);
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
