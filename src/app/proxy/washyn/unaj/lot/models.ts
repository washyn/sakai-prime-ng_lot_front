
export interface LookupDto<TKey = "string"> {
  id: TKey;
  displayName?: string;
  alternativeText?: string;
}
