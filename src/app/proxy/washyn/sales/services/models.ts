import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface ContribuyenteDto extends EntityDto<string> {
  razonSocial?: string;
  estadoContribuyente?: string;
  condicionDomicilio?: string;
  ubigeo?: string;
  tipoVia?: string;
  nombreVia?: string;
  codigoZona?: string;
  tipoZona?: string;
  numero?: string;
  interior?: string;
  lote?: string;
  departamento?: string;
  manzana?: string;
  kilometro?: string;
  comentario?: string;
}

export interface ContribuyenteFilter extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface ProductoDto extends EntityDto<number> {
  codigo?: string;
  nombre?: string;
  descripcion?: string;
  observacion?: string;
  precio: number;
  cantidadStock?: number;
  expires?: string;
}
