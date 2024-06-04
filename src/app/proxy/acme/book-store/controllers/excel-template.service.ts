import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExcelTemplateService {
  apiName = 'Default';
  

  getFileTemplate = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/files/template',
    },
    { apiName: this.apiName,...config });
  

  loadDataByContent = (content: FormData, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/files/load',
      body: content,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
