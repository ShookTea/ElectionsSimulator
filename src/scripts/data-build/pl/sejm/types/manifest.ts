import { CsvOptions } from '@/scripts/data-build/csv-reader';

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
  csvOptions: CsvOptions;
  electionCsvColumns: {
    districtNumber: string;
  };
  populationFile: string;
  populationCsvColumns: {
    districtNumber: string;
    population: string;
    districtType: string;
  };
  populationIgnoreDistrictTypes: string[];
  partyDefinitions: PartyDefinition[];
}
