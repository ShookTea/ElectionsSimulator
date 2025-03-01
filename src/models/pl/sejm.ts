import { PartyAbbreviation, PartyDefinition } from '@/models/pl/party-definition';

export type DistrictResult = {
  districtNumber: number;
  population: number;
  // The real number of mandates used in the district, in case it differs from the calculated number.
  numberOfMandatesUsed?: number;
  totalVotes: number;
  results: Record<PartyAbbreviation, number>;
}

export type Sejm = {
  year: number;
  partyDefinitions: PartyDefinition[];
  districtResults: DistrictResult[];
}
