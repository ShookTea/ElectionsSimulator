import { NumberMap } from '@/models/utils/number-map';
import { PartyAbbreviation } from '@/models/pl/party-definition';
import { DistrictResult } from '@/models/pl/sejm';

export type ProportionalMethod = 'dHondt' | 'SainteLague' | 'HuntingtonHill';
export type FirstPastThePostMethod = 'fptp';
export type ResultMethod = ProportionalMethod | FirstPastThePostMethod;

export const PROPORTIONAL_METHODS: ProportionalMethod[] = ['dHondt', 'SainteLague', 'HuntingtonHill'];

export function calculateResults(
  seatDistribution: NumberMap,
  results: DistrictResult[],
  allowedParties: PartyAbbreviation[],
  method: ResultMethod
): Record<PartyAbbreviation, number> {
  return results.reduce((acc, district) => {
    const districtResults = getResultForDistrict(district.districtKey, seatDistribution, results, allowedParties, method);
    for (const [party, mandates] of Object.entries(districtResults)) {
      acc[party as PartyAbbreviation] = (acc[party as PartyAbbreviation] || 0) + mandates;
    }
    return acc;
  }, {} as Record<PartyAbbreviation, number>);
}

function getResultForDistrict(
  districtKey: number | string,
  seatDistribution: NumberMap,
  results: DistrictResult[],
  allowedParties: PartyAbbreviation[],
  method: ResultMethod
): Record<PartyAbbreviation, number> {
  const mandatesInDistrict = seatDistribution[districtKey];
  const resultsInDistrict = results.find(r => r.districtKey === districtKey);
  const resultsForAllowedParties: Record<PartyAbbreviation, number> = Object.entries(resultsInDistrict.results)
    .filter(([party]) => allowedParties.includes(party as PartyAbbreviation))
    .reduce((acc, [party, votes]) => ({ ...acc, [party]: votes }), {} as Record<PartyAbbreviation, number>);

  if (method === 'dHondt') {
    return buildResultsWithHighestAveragesMethod(
      resultsForAllowedParties,
      mandatesInDistrict,
      (seats) => seats + 1,
    );
  }
  if (method === 'SainteLague') {
    return buildResultsWithHighestAveragesMethod(
      resultsForAllowedParties,
      mandatesInDistrict,
      (seats) => seats * 2 + 1,
    );
  }
  if (method === 'HuntingtonHill') {
    return buildResultsWithHighestAveragesMethod(
      resultsForAllowedParties,
      mandatesInDistrict,
      (seats) => Math.sqrt(seats * (seats + 1)),
    );
  }
  if (method === 'fptp') {
    return buildResultsWithFirstPastThePostMethod(
      resultsForAllowedParties,
    );
  }
}

function buildResultsWithHighestAveragesMethod(
  votesByParty: Record<PartyAbbreviation, number>,
  mandatesInDistrict: number,
  currentSeatsToDivisor: (seats: number) => number,
): Record<PartyAbbreviation, number> {
  const valuesMap: { party: PartyAbbreviation, value: number }[] = [];
  for (const [ party, votes ] of Object.entries(votesByParty)) {
    for (let i = 1; i <= mandatesInDistrict; i++) {
      valuesMap.push({party: party as PartyAbbreviation, value: votes / currentSeatsToDivisor(i - 1)});
    }
  }
  valuesMap.sort((a, b) => b.value - a.value);
  const result: Record<PartyAbbreviation, number> = {};
  for (let i = 0; i < mandatesInDistrict; i++) {
    const {party} = valuesMap[i];
    result[party] = (result[party] || 0) + 1;
  }

  return result;
}

function buildResultsWithFirstPastThePostMethod(
  votesByParty: Record<PartyAbbreviation, number>,
): Record<PartyAbbreviation, number> {
  // Party with highest number of votes
  const winner = Object.entries(votesByParty)
    .sort((a, b) => b[1] - a[1])
    .shift()[0];
  return { [winner]: 1 };
}
