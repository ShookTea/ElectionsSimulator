import { Manifest } from '@/scripts/data-build/pl/sejm/types/manifest';
import { createCsvParser } from '@/scripts/data-build/csv-reader';

function getPopulationFileName(
  manifest: Manifest,
  key: 'district' | 'gmina' | 'powiat',
): string {
  if (key === 'powiat') {
    return manifest.powiatPopulationFile ?? manifest.populationFile;
  } else {
    return manifest.populationFile;
  }
}

export async function buildPopulationData(
  manifest: Manifest,
  key: 'district' | 'gmina' | 'powiat',
): Promise<Record<string, number>> {
  const parser = createCsvParser(
    getPopulationFileName(manifest, key),
    manifest.csvOptions,
  );

  let districtKeyColumn: string|null = null;
  let populationColumn: number|null = null;
  let districtTypeColumn: number|null = null;

  const result: Record<string, number> = {};

  for await (const record of parser) {
    if (districtKeyColumn === null) {
      populationColumn = record.indexOf(manifest.populationCsvColumns.population);
      districtTypeColumn = record.indexOf(manifest.populationCsvColumns.districtType);
      if (key === 'district') {
        districtKeyColumn = record.indexOf(manifest.populationCsvColumns.districtKey);
      } else if (key === 'gmina') {
        districtKeyColumn = record.indexOf(manifest.populationCsvColumns.gminaKey);
      } else {
        districtKeyColumn = record.indexOf(manifest.populationCsvColumns.powiatKey);
      }
    } else {
      const districtKey = record[districtKeyColumn] ?? '';
      const population = parseInt(
        (record[populationColumn] as string)
          .replace('.', '')
      );
      const districtType = record[districtTypeColumn];

      if (manifest.populationIgnoreDistrictTypes?.includes(districtType) ?? false) {
        continue;
      }

      if (isNaN(population) || districtKey === '') {
        console.log(record);
        throw new Error(`Invalid population data for district ${districtKey}`);
      }

      if (!result[districtKey]) {
        result[districtKey] = 0;
      }
      result[districtKey] += population;
    }
  }

  return result;
}
