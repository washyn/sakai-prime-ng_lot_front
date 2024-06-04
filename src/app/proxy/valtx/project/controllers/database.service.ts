import type { ColumnsOutput, GetDataInput, TableDataOutput, TableOutput } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  apiName = 'Default';
  

  getDataByInput = (input: GetDataInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TableDataOutput>({
      method: 'GET',
      url: '/api/app/data',
      params: { table: input.table, fields: input.fields },
    },
    { apiName: this.apiName,...config });
  

  getFieldByTableAndSchema = (table: string, schema: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ColumnsOutput[]>({
      method: 'GET',
      url: `/api/app/select/field/${table}`,
      params: { schema },
    },
    { apiName: this.apiName,...config });
  

  getReportExcelByInput = (input: GetDataInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/api/app/data/excel',
      params: { table: input.table, fields: input.fields },
    },
    { apiName: this.apiName,...config });
  

  getTables = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, TableOutput[]>({
      method: 'GET',
      url: '/api/app/select/table',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
