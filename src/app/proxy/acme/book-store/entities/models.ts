import type { EntityDto } from '@abp/ng.core';
import type { Gender } from './gender.enum';

export interface CreateUpdateDocenteDto extends EntityDto {
  nombre?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  genero: Gender;
  gradoId?: string;
}

export interface DocenteDto extends EntityDto<string> {
  nombre?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  genero: Gender;
  gradoId?: string;
}

export interface DocenteWithLookup extends EntityDto<string> {
  nombre?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  genero: Gender;
  gradoId?: string;
  gradoName?: string;
  gradoPrefix?: string;
}
