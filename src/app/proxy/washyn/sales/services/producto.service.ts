import type { ProductoDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  apiName = 'Default';
  

  create = (input: ProductoDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProductoDto>({
      method: 'POST',
      url: '/api/app/producto',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/producto/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProductoDto>({
      method: 'GET',
      url: `/api/app/producto/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ProductoDto>>({
      method: 'GET',
      url: '/api/app/producto',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: ProductoDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProductoDto>({
      method: 'PUT',
      url: `/api/app/producto/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
