export type PartyDefinition = {
  name: string;
  abbreviation: string;
  columnName: string;
  color?: string;
  coalition?: boolean;
  nationalMinority?: boolean;
}

export type Manifest = {
  file: string;
  csvOptions: {
    bom: boolean;
    quote: string;
    delimiter: string;
    recordDelimiter: string;
  };
  electionCsvColumns: {
    districtNumber: string;
  };
  partyDefinitions: PartyDefinition[];
}
