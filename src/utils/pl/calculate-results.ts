import { NumberMap } from '@/models/utils/number-map';
import { PartyAbbreviation } from '@/models/pl/party-definition';
import { DistrictResult } from '@/models/pl/sejm';

export type ResultMethod = 'dHondt';

export function calculateResults(
  seatDistribution: NumberMap,
  results: DistrictResult[],
  allowedParties: PartyAbbreviation[],
  method: ResultMethod
): Record<PartyAbbreviation, number> {
  return results.reduce((acc, district) => {
    const districtResults = getResultForDistrict(district.districtNumber, seatDistribution, results, allowedParties, method);
    for (const [party, mandates] of Object.entries(districtResults)) {
      acc[party as PartyAbbreviation] = (acc[party as PartyAbbreviation] || 0) + mandates;
    }
    return acc;
  }, {} as Record<PartyAbbreviation, number>);
}

function getResultForDistrict(
  districtKey: number,
  seatDistribution: NumberMap,
  results: DistrictResult[],
  allowedParties: PartyAbbreviation[],
  method: ResultMethod
): Record<PartyAbbreviation, number> {
  const mandatesInDistrict = seatDistribution[districtKey];
  const resultsInDistrict = results.find(r => r.districtNumber === districtKey);
  const resultsForAllowedParties: Record<PartyAbbreviation, number> = Object.entries(resultsInDistrict.results)
    .filter(([party]) => allowedParties.includes(party as PartyAbbreviation))
    .reduce((acc, [party, votes]) => ({ ...acc, [party]: votes }), {} as Record<PartyAbbreviation, number>);

  if (method === 'dHondt') {
    return buildResultsWithDHondt(resultsForAllowedParties, mandatesInDistrict);
  }
}

function buildResultsWithDHondt(
  votesByParty: Record<PartyAbbreviation, number>,
  mandatesInDistrict: number
): Record<PartyAbbreviation, number> {
  const valuesMap: { party: PartyAbbreviation, value: number }[] = [];
  for (const [party, votes] of Object.entries(votesByParty)) {
    for (let i = 1; i <= mandatesInDistrict; i++) {
      valuesMap.push({ party: party as PartyAbbreviation, value: votes / i });
    }
  }
  valuesMap.sort((a, b) => b.value - a.value);
  const result: Record<PartyAbbreviation, number> = {};
  for (let i = 0; i < mandatesInDistrict; i++) {
    const { party } = valuesMap[i];
    result[party] = (result[party] || 0) + 1;
  }

  return result;
}
