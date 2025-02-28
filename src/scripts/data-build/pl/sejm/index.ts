import * as fs from 'node:fs';
import { Manifest } from '@/scripts/data-build/pl/sejm/types/manifest';
import { Result } from '@/scripts/data-build/pl/sejm/types/result';
import { Sejm } from '@/models/pl/sejm';
import { getResults } from '@/scripts/data-build/pl/sejm/voting-results';
import { buildPopulationData } from '@/scripts/data-build/pl/sejm/population-data';

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
  const votingResults = await getResults(manifest);
  const populationData = await buildPopulationData(manifest);
  const finalResult = convertToFinalResult(votingResults, populationData, manifest, year);
  const resultAsString = JSON.stringify(finalResult, null, 2);
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

function convertToFinalResult(
  resultsByDistrict: Record<number, Result>,
  populationByDistrict: Record<number, number>,
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
        population: populationByDistrict[parseInt(districtNumber)],
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
function loadManifestFromFile(path: string): Manifest {
  return JSON.parse(fs.readFileSync(path, 'utf8')) as Manifest;
}
