import * as fs from 'node:fs';
import { Manifest } from '@/scripts/data-build/pl/sejm/types/manifest';
import * as path from 'node:path';
import { parse, Parser } from 'csv-parse';
import { HeaderConfig } from '@/scripts/data-build/pl/sejm/types/header-config';
import { Result } from '@/scripts/data-build/pl/sejm/types/result';
import { Sejm } from '@/models/pl/sejm';

export default async function buildDataForSejm(): Promise<void> {
  console.log('Building data for Sejm');
  const path = `sourceData/pl/sejm`;

  await Promise.all(fs.readdirSync(path).map(async (yearFile) => {
    const [year, extension] = yearFile.split('.');
    const yearNumber = parseInt(year);
    if (extension === 'json') {
      await buildForYear(yearNumber, `${path}/${yearFile}`);
    }
  }));
}

async function buildForYear(year: number, manifestPath: string): Promise<void> {
  console.log('Building data for Sejm year', year);

  const manifest = loadManifestFromFile(manifestPath);
  const dataPath = `${path.dirname(manifestPath)}/${manifest.file}`;
  const result = await getResultsFromManifest(year, manifest, dataPath);
  const resultAsString = JSON.stringify(result, null, 2);
  const fileContent = [
    'import { Sejm } from \'@/models/pl/sejm\';',
    '',
    'const data: Sejm = ' + resultAsString,
    '',
    'export default data;',
  ].join('\n');

  fs.mkdirSync('src/data/pl/sejm', { recursive: true });
  fs.writeFileSync(`src/data/pl/sejm/${year}.ts`, fileContent);
}

async function getResultsFromManifest(year: number, manifest: Manifest, dataPath: string): Promise<Sejm> {
  const parser = createCsvParserForManifest(dataPath, manifest);
  let headerConfig: HeaderConfig|null = null;

  const resultsByDistrict: Record<number, Result> = {};

  for await (const record of parser) {
    if (!headerConfig) {
      headerConfig = buildHeaderConfig(record, manifest);
    } else {
      const rowEntry = buildRowResult(record, headerConfig);
      if (resultsByDistrict[rowEntry.districtNumber]) {
        resultsByDistrict[rowEntry.districtNumber] = sumResults(resultsByDistrict[rowEntry.districtNumber], rowEntry);
      } else {
        resultsByDistrict[rowEntry.districtNumber] = rowEntry;
      }
    }
  }

  return convertToFinalResult(resultsByDistrict, manifest, year);
}

function convertToFinalResult(
  resultsByDistrict: Record<number, Result>,
  manifest: Manifest,
  year: number,
): Sejm {
  return {
    year,
    partyDefinitions: manifest.partyDefinitions
      .map(({ columnName, ...rest}) => ({ ...rest })),
    districtResults: Object.entries(resultsByDistrict).map(([districtNumber, result]) => ({
        districtNumber: parseInt(districtNumber),
        totalVotes: result.totalVotes,
        results: convertDistrictToFinalResult(result, manifest),
      })
    ),
  }
}

function convertDistrictToFinalResult(result: Result, manifest: Manifest): Record<string, number> {
  return Object.fromEntries(
    Object.entries(result.partyResults)
      .map(([party, votes]) => ([
        manifest.partyDefinitions.find((partyDefinition) => partyDefinition.columnName === party)?.abbreviation,
        votes,
      ]))
  );
}

function sumResults(result1: Result, result2: Result): Result {
  const partyResults: Record<string, number> = {};
  Object.keys(result1.partyResults).forEach((party) => {
    partyResults[party] = (result1.partyResults[party] || 0) + (result2.partyResults[party] || 0);
  });

  return {
    districtNumber: result1.districtNumber,
    totalVotes: result1.totalVotes + result2.totalVotes,
    partyResults,
  };
}

function buildRowResult(row: string[], headerConfig: HeaderConfig): Result {
  const districtNumber = parseInt(row[headerConfig.districtNumber]);
  let totalVotes = 0;

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
    districtNumber,
    totalVotes,
    partyResults,
  };
}

function buildHeaderConfig(headerRow: string[], manifest: Manifest): HeaderConfig {
  const partyColumns: Record<string, number> = {};
  manifest.partyDefinitions.forEach((partyDefinition) => {
    const index = headerRow.indexOf(partyDefinition.columnName);
    if (index === -1) {
      throw new Error(`Column ${partyDefinition.columnName} not found in header`);
    }
    partyColumns[partyDefinition.columnName] = index;
  });

  return {
    districtNumber: headerRow.indexOf(manifest.electionCsvColumns.districtNumber),
    partyColumns,
  };
}

function createCsvParserForManifest(dataPath: string, manifest: Manifest): Parser {
  return fs.createReadStream(dataPath, 'utf-8').pipe(parse({
    bom: manifest.csvOptions.bom,
    quote: manifest.csvOptions.quote,
    delimiter: manifest.csvOptions.delimiter,
    record_delimiter: manifest.csvOptions.recordDelimiter,
    trim: true,
  }));
}

function loadManifestFromFile(path: string): Manifest {
  return JSON.parse(fs.readFileSync(path, 'utf8')) as Manifest;
}
