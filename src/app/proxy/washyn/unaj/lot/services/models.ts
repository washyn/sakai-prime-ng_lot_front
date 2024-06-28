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
  docenteId?: string;
  roleId?: string;
}

export interface DocenteLookup extends EntityDto<string> {
  fullName?: string;
}

export interface RemoveLotResultDto {
  docenteId?: string;
  roleId?: string;
}

export interface ResultLotFilterDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}
