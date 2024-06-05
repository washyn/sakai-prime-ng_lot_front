import type { EntityDto, FullAuditedEntityDto } from '@abp/ng.core';
import type { Gender } from './gender.enum';
import type { Area } from './area.enum';

export interface CreateUpdateDocenteDto extends EntityDto {
  nombre?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  genero: Gender;
  gradoId?: string;
}

export interface DocenteDto extends FullAuditedEntityDto<string> {
  nombre?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  genero: Gender;
  gradoId?: string;
  area?: Area;
}

export interface DocenteWithLookup extends EntityDto<string> {
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
