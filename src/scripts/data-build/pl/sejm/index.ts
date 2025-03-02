import * as fs from 'node:fs';
import { Manifest } from '@/scripts/data-build/pl/sejm/types/manifest';
import { Result } from '@/scripts/data-build/pl/sejm/types/result';
import { DistrictResult, Sejm } from '@/models/pl/sejm';
import { getResults } from '@/scripts/data-build/pl/sejm/voting-results';
import { buildPopulationData } from '@/scripts/data-build/pl/sejm/population-data';

export default async function buildDataForSejm(): Promise<void> {
  console.log('Building data for Sejm');
  const path = `sourceData/pl/sejm`;

  const files = fs.readdirSync(path);
  for (const yearFile of files) {
    const [ year, extension ] = yearFile.split('.');
    const yearNumber = parseInt(year);
    if (extension === 'json') {
      await buildForYear(yearNumber, `${ path }/${ yearFile }`);
    }
  }
}

async function buildForYear(year: number, manifestPath: string): Promise<void> {
  console.log('Building data for Sejm year', year);

  const manifest = loadManifestFromFile(manifestPath);
  const votingResultsByDistrict = await getResults(manifest);
  const populationDataByDistrict = await buildPopulationData(manifest);
  const resultsByDistrict = buildResultsForDistrict(votingResultsByDistrict, populationDataByDistrict, manifest, true);
  const finalResult: Sejm = {
    year,
    mandateOverrideReason: manifest.overrideReason ?? 'wrong_data',
    partyDefinitions: manifest.partyDefinitions
      .map(({columnName, ...rest}) => ({...rest})),
    districtResults: resultsByDistrict,
  };
  const resultAsString = JSON.stringify(finalResult, null, 2);
  const fileContent = [
    'import { Sejm } from \'@/models/pl/sejm\';',
    '',
    'const data: Sejm = ' + resultAsString,
    '',
    'export default data;',
  ].join('\n');

  fs.mkdirSync('src/data/pl/sejm', {recursive: true});
  fs.writeFileSync(`src/data/pl/sejm/${ year }.ts`, fileContent);
}

function buildResultsForDistrict(
  resultsByDistrict: Record<string, Result>,
  populationByDistrict: Record<string, number>,
  manifest: Manifest,
  useOverride: boolean,
): DistrictResult[] {
  return Object.entries(resultsByDistrict).map(([ districtNumber, result ]) => {
      const districtResult: DistrictResult = {
        districtKey: districtNumber,
        totalVotes: result.totalVotes,
        population: populationByDistrict[parseInt(districtNumber)],
        results: convertDistrictToFinalResult(result, manifest),
      };
      if (useOverride && manifest.numberOfMandatesOverride && manifest.numberOfMandatesOverride[districtNumber]) {
        districtResult.numberOfMandatesUsed = manifest.numberOfMandatesOverride[districtNumber];
      }
      return districtResult;
    },
  );
}

function convertDistrictToFinalResult(result: Result, manifest: Manifest): Record<string, number> {
  return Object.fromEntries(
    Object.entries(result.partyResults)
      .map(([ party, votes ]) => ([
        manifest.partyDefinitions.find((partyDefinition) => partyDefinition.columnName === party)?.abbreviation,
        votes,
      ])),
  );
}

function loadManifestFromFile(path: string): Manifest {
  return JSON.parse(fs.readFileSync(path, 'utf8')) as Manifest;
}
