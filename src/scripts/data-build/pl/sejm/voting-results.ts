import { Manifest } from '@/scripts/data-build/pl/sejm/types/manifest';
import { Result } from '@/scripts/data-build/pl/sejm/types/result';
import { createCsvParser } from '@/scripts/data-build/csv-reader';
import { HeaderConfig } from '@/scripts/data-build/pl/sejm/types/header-config';

export async function getResults(
  manifest: Manifest,
  key: 'district' | 'gmina',
): Promise<Record<string, Result>> {
  const parser = createCsvParser(manifest.file, manifest.csvOptions);
  let headerConfig: HeaderConfig|null = null;

  const resultsByDistrict: Record<string, Result> = {};

  for await (const record of parser) {
    if (!headerConfig) {
      headerConfig = buildHeaderConfig(record, manifest, key);
    } else {
      const rowEntry = buildRowResult(record, manifest, headerConfig);
      if (rowEntry === null) {
        continue;
      }
      if (resultsByDistrict[rowEntry.districtKey]) {
        resultsByDistrict[rowEntry.districtKey] = sumResults(resultsByDistrict[rowEntry.districtKey], rowEntry);
      } else {
        resultsByDistrict[rowEntry.districtKey] = rowEntry;
      }
    }
  }

  return resultsByDistrict;
}

function sumResults(result1: Result, result2: Result): Result {
  const partyResults: Record<string, number> = {};
  Object.keys(result1.partyResults).forEach((party) => {
    partyResults[party] = (result1.partyResults[party] || 0) + (result2.partyResults[party] || 0);
  });

  return {
    districtKey: result1.districtKey,
    totalVotes: result1.totalVotes + result2.totalVotes,
    partyResults,
  };
}

function buildRowResult(row: string[], manifest: Manifest, headerConfig: HeaderConfig): Result|null {
  const districtKey = row[headerConfig.districtKey];
  let totalVotes = 0;

  if (districtKey === '' || manifest.populationIgnoreDistrictTypes?.includes(districtKey)) {
    return null;
  }

  const partyResults: Record<string, number> = {};
  Object.entries(headerConfig.partyColumns).forEach(([columnName, index]) => {
    const votes = parseInt(row[index]);
    if (isNaN(votes)) {
      partyResults[columnName] = 0;
    } else {
      partyResults[columnName] = votes;
      totalVotes += votes;
    }
  });

  return {
    districtKey,
    totalVotes,
    partyResults,
  };
}

function buildHeaderConfig(headerRow: string[], manifest: Manifest, key: 'district' | 'gmina'): HeaderConfig {
  const partyColumns: Record<string, number> = {};
  manifest.partyDefinitions.forEach((partyDefinition) => {
    const index = headerRow.indexOf(partyDefinition.columnName);
    if (index === -1) {
      throw new Error(`Column ${partyDefinition.columnName} not found in header`);
    }
    partyColumns[partyDefinition.columnName] = index;
  });

  const districtKey = key === 'district' ? manifest.electionCsvColumns.districtKey : manifest.electionCsvColumns.gminaKey;

  return {
    districtKey: headerRow.indexOf(districtKey),
    partyColumns,
  };
}
