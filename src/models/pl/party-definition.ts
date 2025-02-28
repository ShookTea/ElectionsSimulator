export type PartyAbbreviation = string;

export type PartyDefinition = {
  name: string;
  abbreviation: PartyAbbreviation;
  color?: string;
  coalition?: boolean;
  nationalMinority?: boolean;
}
