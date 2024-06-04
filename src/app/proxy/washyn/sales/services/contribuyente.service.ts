import type { ContribuyenteDto, ContribuyenteFilter } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContribuyenteService {
  apiName = 'Default';
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ContribuyenteDto>({
      method: 'GET',
      url: `/api/app/contribuyente/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: ContribuyenteFilter, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ContribuyenteDto>>({
      method: 'GET',
      url: '/api/app/contribuyente',
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
