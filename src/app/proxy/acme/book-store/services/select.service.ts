import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { LookupDto } from '../../../washyn/unaj/lot/models';

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  apiName = 'Default';
  

  getCurso = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto[]>({
      method: 'GET',
      url: '/api/app/select/curso',
    },
    { apiName: this.apiName,...config });
  

  getDocente = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto[]>({
      method: 'GET',
      url: '/api/app/select/docente',
    },
    { apiName: this.apiName,...config });
  

  getGrado = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto[]>({
      method: 'GET',
      url: '/api/app/select/grado',
    },
    { apiName: this.apiName,...config });
  

  getRol = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupDto[]>({
      method: 'GET',
      url: '/api/app/select/rol',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
