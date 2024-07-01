import type { FullAuditedEntityDto } from '@abp/ng.core';
import type { Gender } from '../../../../acme/book-store/entities/gender.enum';
import type { Area } from '../../../../acme/book-store/entities/area.enum';

export interface DocenteRoleData extends FullAuditedEntityDto<string> {
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
  rolName?: string;
  rolId?: string;
  comision?: string;
  comisionId?: string;
}
