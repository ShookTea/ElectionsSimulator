import { PartyAbbreviation, PartyDefinition } from '@/models/pl/party-definition';

export type MandateOverrideReason =
  // The number of mandates used during the election does not match what should be used based on the population.
  | 'wrong_data'
  // The app does not have valid population data for the given year, uses the number of people eligible to vote instead.
  | 'lack_of_data';

export type DistrictResult = {
  districtKey: number | string;
  population: number;
  // The real number of mandates used in the district, in case it differs from the calculated number.
  numberOfMandatesUsed?: number;
  totalVotes: number;
  results: Record<PartyAbbreviation, number>;
}

export type UseAsDistrict = 'gmina' | 'district';

export type Sejm = {
  year: number;
  partyDefinitions: PartyDefinition[];
  districtResults: DistrictResult[];
  gminaResults: DistrictResult[];
  mandateOverrideReason: MandateOverrideReason;
}
