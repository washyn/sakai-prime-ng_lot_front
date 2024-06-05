import type { FullAuditedEntityDto } from '@abp/ng.core';

export interface ResultLotDto extends FullAuditedEntityDto {
  docenteFullName?: string;
  rolDisplay?: string;
}
