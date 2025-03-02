import * as fs from 'node:fs';
import { DistrictResult, Sejm } from '@/models/pl/sejm';
import { PartyAbbreviation, PartyDefinition } from '@/models/pl/party-definition';

export async function validateDataForSejm(): Promise<void> {
  console.log('Validating data for Sejm');

  fs.readdirSync('src/data/pl/sejm').forEach((yearFile) => {
    console.log(`Validating file ${ yearFile }`);
    const file = fs.readFileSync(`src/data/pl/sejm/${ yearFile }`, 'utf8');
    const data = JSON.parse(file);
    if (!isSejmData(data)) {
      throw new Error(`Data in file ${ yearFile } is not of type Sejm`);
    }
  });
}

function isSejmData(data: any): data is Sejm {
  if (
    data.year === undefined
    || data.partyDefinitions === undefined
    || !Array.isArray(data.partyDefinitions)
    || data.districtResults === undefined
    || !Array.isArray(data.districtResults)
    || data.gminaResults === undefined
    || !Array.isArray(data.gminaResults)
    || data.mandateOverrideReason === undefined
  ) {
    throw new Error('Data is missing required fields');
  }

  const { partyDefinitions, districtResults, gminaResults } = data;

  if (!partyDefinitions.every((partyDefinition) => isPartyDefinition(partyDefinition))) {
    throw new Error('Party definitions are not of type PartyDefinition');
  }
  const abbreviations = partyDefinitions.map((partyDefinition) => partyDefinition.abbreviation);

  if (!districtResults.every((districtResult) => isDistrictResult(districtResult, abbreviations))) {
    throw new Error('District results are not of type DistrictResult');
  }
  if (!gminaResults.every((gminaResult) => isDistrictResult(gminaResult, abbreviations))) {
    throw new Error('Gmina results are not of type DistrictResult');
  }

  return data.mandateOverrideReason === 'wrong_data' || data.mandateOverrideReason === 'lack_of_data';
}

function isPartyDefinition(data: any): data is PartyDefinition {
  return data.abbreviation !== undefined
    && typeof data.abbreviation === 'string'
    && data.name !== undefined
    && typeof data.name === 'string'
    && (data.color === undefined || typeof data.color === 'string')
    && (data.coalition === undefined || typeof data.coalition === 'boolean')
    && (data.nationalMinority === undefined || typeof data.nationalMinority === 'boolean');
}

function isDistrictResult(
  data: any,
  partyAbbreviations: PartyAbbreviation[]
): data is DistrictResult {
  const result = data.districtKey !== undefined
    && (typeof data.districtKey === 'number' || typeof data.districtKey === 'string')
    && data.population !== undefined
    && typeof data.population === 'number'
    && (data.numberOfMandatesUsed === undefined || typeof data.numberOfMandatesUsed === 'number')
    && data.population > 0
    && data.totalVotes !== undefined
    && typeof data.totalVotes === 'number'
    && data.results !== undefined
    && isResults(data.results, partyAbbreviations);

  if (!result) {
    console.log(data);
  }
  return result;
}

function isResults(data: any, partyAbbreviations: PartyAbbreviation[]): data is Record<PartyAbbreviation, number> {
  return Object.keys(data).every((key) => partyAbbreviations.includes(key))
    && Object.values(data).every((value) => typeof value === 'number');
}
