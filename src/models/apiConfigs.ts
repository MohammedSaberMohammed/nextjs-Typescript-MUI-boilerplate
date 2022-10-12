export interface APIConfigsModel {
  baseUrls: { 
    auth: string;
    shared: string;
    baseOnly: string;
  },
  configs: {
    timeout: number,
    withCredentials?: boolean;
    xsrfHeaderName?: string;
    headers: {
      accept: string;
      'Content-Type': string;
    }
  }
}