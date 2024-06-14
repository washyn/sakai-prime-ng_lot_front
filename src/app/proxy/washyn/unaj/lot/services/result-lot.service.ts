import type { CreateLotResultDto, ResultLotDto, ResultLotFilterDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResultLotService {
  apiName = 'Default';
  

  createLot = (create: CreateLotResultDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/result-lot/lot',
      body: create,
    },
    { apiName: this.apiName,...config });
  

  getList = (filter: ResultLotFilterDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ResultLotDto>>({
      method: 'GET',
      url: '/api/app/result-lot',
      params: { filter: filter.filter, sorting: filter.sorting, skipCount: filter.skipCount, maxResultCount: filter.maxResultCount },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
