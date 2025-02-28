export type Manifest = {
  file: string;
  csvOptions: {
    bom: boolean;
    quote: string;
    delimiter: string;
    recordDelimiter: string;
  }
}
