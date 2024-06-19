import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface AsignComisionDto {
  docenteId?: string;
  comisionId?: string;
}

export interface ComisionDto extends EntityDto<string> {
  nombre: string;
}

export interface CreateLotResultDto {
  docenteId?: string;
  roleId?: string;
}

export interface DocenteLookup extends EntityDto<string> {
  fullName?: string;
}

export interface ResultLotFilterDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}
