
export interface ColumnsOutput {
  name?: string;
  dataType?: string;
}

export interface GetDataInput {
  table: string;
  fields: string[];
}

export interface TableDataOutput {
  fields: string[];
  data: object[];
}

export interface TableOutput {
  schema?: string;
  name?: string;
  fullName?: string;
}
