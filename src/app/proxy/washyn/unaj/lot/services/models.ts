import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreateLotResultDto {
  docenteId?: string;
  roleId?: string;
}

export interface ResultLotDto extends FullAuditedEntityDto {
  docenteFullName?: string;
  rolDisplay?: string;
}

export interface ResultLotFilterDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}
