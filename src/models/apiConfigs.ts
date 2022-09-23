export interface APIConfigsModel {
  baseUrls: { 
    shared: string;
    auth: string;
  },
  configs: {
    timeout: number,
    headers: {
      withCredentials?: boolean;
      accept: string;
      xsrfHeaderName?: string;
      'Content-Type': string;
    }
  }
}