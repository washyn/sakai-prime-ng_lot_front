import type { ModelSample } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorSampleService {
  apiName = 'Default';
  

  error401 = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'GET',
      url: '/api/app/error-sample/error401',
    },
    { apiName: this.apiName,...config });
  

  error403 = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'GET',
      url: '/api/app/error-sample/error403',
    },
    { apiName: this.apiName,...config });
  

  error404 = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'GET',
      url: '/api/app/error-sample/error404',
    },
    { apiName: this.apiName,...config });
  

  error40XXXByModelSample = (modelSample: ModelSample, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'GET',
      url: '/api/app/error-sample/error40XXX',
      params: { testValue: modelSample.testValue, secondValue: modelSample.secondValue },
    },
    { apiName: this.apiName,...config });
  

  error500 = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'GET',
      url: '/api/app/error-sample/error500',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
