export interface APIConfigsModel {
  baseUrls: { 
    shared: string 
  },
  configs: {
    timeout: number,
    headers: {
      withCredentials: boolean;
      accept: string;
      xsrfHeaderName: string;
      'Content-Type': string;

    }
  }
}