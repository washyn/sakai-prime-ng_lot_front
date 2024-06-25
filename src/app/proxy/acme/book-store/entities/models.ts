import type { EntityDto, FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { Gender } from './gender.enum';
import type { Area } from './area.enum';

export interface CreateUpdateDocenteDto extends EntityDto {
  dni?: string;
  nombre?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  genero: Gender;
  gradoId?: string;
  area?: Area;
}

export interface DocenteDto extends FullAuditedEntityDto<string> {
  dni?: string;
  nombre?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  genero: Gender;
  gradoId?: string;
  area?: Area;
}

export interface DocenteFilter extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface DocenteWithLookup extends FullAuditedEntityDto<string> {
  dni?: string;
  nombre?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  genero: Gender;
  gradoId?: string;
  gradoName?: string;
  gradoPrefix?: string;
  area?: Area;
  fullName?: string;
}

export interface RolDto {
  id?: string;
  nombre?: string;
}

export interface DocenteWithRolDto extends EntityDto<string> {
  dni?: string;
  nombre?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  genero: Gender;
  gradoId?: string;
  gradoName?: string;
  gradoPrefix?: string;
  area?: Area;
  fullName?: string;
  rolId?: string;
  rolName?: string;
}
