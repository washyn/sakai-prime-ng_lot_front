import type { ResultLotDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResultLotService {
  apiName = 'Default';
  

  getList = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ResultLotDto>>({
      method: 'GET',
      url: '/api/app/result-lot',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
