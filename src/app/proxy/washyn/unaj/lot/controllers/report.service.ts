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
  

  getSamplePdfReportById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/report/sample',
      params: { id },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
