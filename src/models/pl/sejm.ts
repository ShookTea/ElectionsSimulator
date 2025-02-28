export type PartyAbbreviation = string;

export type PartyDefinition = {
  name: string;
  abbreviation: PartyAbbreviation;
  color?: string;
  coalition?: boolean;
  nationalMinority?: boolean;
}

export type DistrictResult = {
  districtNumber: number;
  totalVotes: number;
  results: Record<string, number>;
}

export type Sejm = {
  year: number;
  partyDefinitions: PartyDefinition[];
  districtResults: DistrictResult[];
}
