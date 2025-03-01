import { Manifest } from '@/scripts/data-build/pl/sejm/types/manifest';
import { createCsvParser } from '@/scripts/data-build/csv-reader';

export async function buildPopulationData(
  manifest: Manifest,
  key: 'district' | 'gmina',
): Promise<Record<string, number>> {
  const parser = createCsvParser(manifest.populationFile, manifest.csvOptions);

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
      } else {
        districtKeyColumn = record.indexOf(manifest.populationCsvColumns.gminaKey);
      }
    } else {
      const districtKey = record[districtKeyColumn] ?? '';
      const population = parseInt(record[populationColumn]);
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
