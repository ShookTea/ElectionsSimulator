export type Result = {
  districtNumber: number;
  totalVotes: number;
  partyResults: Record<string, number>; // columnName -> votes
}
