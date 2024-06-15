import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  apiName = 'Default';
  

  getAllPdfReport = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/report/all-lot-result',
    },
    { apiName: this.apiName,...config });
  

  sampleErrorFriendly = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'GET',
      url: '/report/error-frieldy-sample',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
