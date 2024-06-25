import type { AddRol, AsignComisionDto, ComisionDto, ComisionWithRoles, DocenteLookup } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ComisionService {
  apiName = 'Default';
  

  addRolByModel = (model: AddRol, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/comision/rol',
      body: model,
    },
    { apiName: this.apiName,...config });
  

  assignToComisionByData = (data: AsignComisionDto[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/comision/assign-to-comision',
      body: data,
    },
    { apiName: this.apiName,...config });
  

  create = (input: ComisionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ComisionDto>({
      method: 'POST',
      url: '/api/app/comision',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/comision/${id}`,
    },
    { apiName: this.apiName,...config });
  

  deleteIntegranteByIntegranteIdAndComisionId = (integranteId: string, comisionId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/comision/integrante',
      params: { integranteId, comisionId },
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ComisionDto>({
      method: 'GET',
      url: `/api/app/comision/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getAllWithDetails = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ComisionWithRoles[]>({
      method: 'GET',
      url: '/api/app/comision/with-details',
    },
    { apiName: this.apiName,...config });
  

  getDataByComision = (comisionId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DocenteLookup[]>({
      method: 'GET',
      url: `/api/app/comision/data-by-comision/${comisionId}`,
    },
    { apiName: this.apiName,...config });
  

  getDocente = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DocenteLookup[]>({
      method: 'GET',
      url: '/api/app/comision/docente',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ComisionDto>>({
      method: 'GET',
      url: '/api/app/comision',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: ComisionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ComisionDto>({
      method: 'PUT',
      url: `/api/app/comision/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
