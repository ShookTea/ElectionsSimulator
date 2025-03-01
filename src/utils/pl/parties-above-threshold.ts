import { PartyDefinition } from '@/models/pl/party-definition';
import { DistrictResult } from '@/models/pl/sejm';

/**
 * Returns abbreviations of parties that are above the threshold in the given election results.
 */
export function getPartiesAboveThreshold(
  parties: PartyDefinition[],
  electionResults: DistrictResult[],
  mainThreshold: number,
  coalitionThreshold: number,
  nationalMinorityThreshold: number,
): string[] {
  const result: string[] = [];

  let allVotes = 0;
  const votesByParty: { [party: string]: number } = {};
  electionResults.forEach((result) => {
    allVotes += result.totalVotes;
    Object.keys(result.results).forEach((party) => {
      if (!votesByParty[party]) {
        votesByParty[party] = 0;
      }
      votesByParty[party] += result.results[party];
    });
  });

  Object.keys(votesByParty).forEach((party) => {
    const partyDefinition = parties.find((p) => p.abbreviation === party);
    if (!partyDefinition) {
      return;
    }

    const threshold = partyDefinition.nationalMinority ? nationalMinorityThreshold : partyDefinition.coalition ? coalitionThreshold : mainThreshold;
    if (votesByParty[party] * 100 / allVotes >= threshold) {
      result.push(party);
    }
  });

  // Sort results by votes
  result.sort((a, b) => votesByParty[b] - votesByParty[a]);

  return result;
}
