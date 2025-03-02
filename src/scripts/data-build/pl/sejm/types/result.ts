export type Result = {
  districtKey: string;
  totalVotes: number;
  partyResults: Record<string, number>; // columnName -> votes
}
