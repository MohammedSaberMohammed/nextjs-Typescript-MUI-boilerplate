export interface APIConfigsModel {
  baseUrls: { 
    auth: string;
    shared: string;
    baseOnly: string;
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