import { mapEnumToOptions } from '@abp/ng.core';

export enum Area {
  Biomedicas = 0,
  Sociales = 1,
  Desconocido = 2,
}

export const areaOptions = mapEnumToOptions(Area);
