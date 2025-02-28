import { PartyAbbreviation, PartyDefinition } from '@/models/pl/party-definition';

export type DistrictResult = {
  districtNumber: number;
  totalVotes: number;
  results: Record<PartyAbbreviation, number>;
}

export type Sejm = {
  year: number;
  partyDefinitions: PartyDefinition[];
  districtResults: DistrictResult[];
}
