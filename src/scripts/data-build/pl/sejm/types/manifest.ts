import { CsvOptions } from '@/scripts/data-build/csv-reader';
import { MandateOverrideReason } from '@/models/pl/sejm';

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
    districtKey: string;
    gminaKey: string;
  };

  populationFile: string;
  populationCsvColumns: {
    districtKey: string;
    gminaKey: string;
    population: string;
    districtType?: string;
  };
  populationIgnoreDistrictTypes?: string[];

  // The real number of mandates used in the district, in case it differs from the calculated number.
  numberOfMandatesOverride?: Record<string, number>;
  overrideReason?: MandateOverrideReason;

  partyDefinitions: PartyDefinition[];
}
