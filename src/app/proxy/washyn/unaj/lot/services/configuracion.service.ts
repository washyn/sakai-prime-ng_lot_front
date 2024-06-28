import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { DocumentOptions } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionService {
  apiName = 'Default';
  

  createConfigByDocumentOptions = (documentOptions: DocumentOptions, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/configuracion/config',
      body: documentOptions,
    },
    { apiName: this.apiName,...config });
  

  getConfig = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DocumentOptions>({
      method: 'GET',
      url: '/api/app/configuracion/config',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
