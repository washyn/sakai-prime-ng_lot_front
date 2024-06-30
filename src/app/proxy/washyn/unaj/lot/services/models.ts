import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { RolDto } from '../../../../acme/book-store/entities/models';

export interface AddRol {
  nombre: string;
  comisionId: string;
}

export interface ComisionDto extends EntityDto<string> {
  nombre: string;
}

export interface ComisionWithRoles extends EntityDto<string> {
  nombre?: string;
  rols: RolDto[];
}

export interface CreateLotResultDto {
  docenteId: string;
  roleId: string;
  comisionId: string;
}

export interface RemoveLotResultDto {
  docenteId: string;
  roleId: string;
  comisionId: string;
}

export interface ResultLotFilterDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}
