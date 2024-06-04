import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdateDocenteDto, DocenteDto } from '../entities/models';

@Injectable({
  providedIn: 'root',
})
export class DocenteService {
  apiName = 'Default';
  

  create = (input: CreateUpdateDocenteDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DocenteDto>({
      method: 'POST',
      url: '/api/app/docente',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/docente/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DocenteDto>({
      method: 'GET',
      url: `/api/app/docente/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<DocenteDto>>({
      method: 'GET',
      url: '/api/app/docente',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CreateUpdateDocenteDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DocenteDto>({
      method: 'PUT',
      url: `/api/app/docente/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
