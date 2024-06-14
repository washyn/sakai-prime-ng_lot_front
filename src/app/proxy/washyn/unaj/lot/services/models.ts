import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreateLotResultDto {
  docenteId?: string;
  roleId?: string;
}

export interface ResultLotFilterDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}
