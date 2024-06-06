import { mapEnumToOptions } from '@abp/ng.core';

export enum Area {
  Desconocido = 0,
  Biomedicas = 1,
  Sociales = 2,
  Ingenierias = 3,
}

export const areaOptions = mapEnumToOptions(Area);
