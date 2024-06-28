import type { CreateLotResultDto, RemoveLotResultDto, ResultLotFilterDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { DocenteWithRolDto } from '../../../../acme/book-store/entities/models';
import type { DocenteRoleData } from '../controllers/models';

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
  

  deleteByDocenteId = (docenteId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/result-lot/by-docente-id/${docenteId}`,
    },
    { apiName: this.apiName,...config });
  

  deleteLot = (model: RemoveLotResultDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/result-lot/lot',
      params: { docenteId: model.docenteId, roleId: model.roleId, comisionId: model.comisionId },
    },
    { apiName: this.apiName,...config });
  

  getAlreadyWithLotByComisionId = (comisionId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DocenteWithRolDto[]>({
      method: 'GET',
      url: `/api/app/result-lot/already-with-lot/${comisionId}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: ResultLotFilterDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<DocenteRoleData>>({
      method: 'GET',
      url: '/api/app/result-lot',
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getWithoutLotByComisionId = (comisionId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DocenteWithRolDto[]>({
      method: 'GET',
      url: `/api/app/result-lot/without-lot/${comisionId}`,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
