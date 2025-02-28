import { Manifest } from '@/scripts/data-build/pl/sejm/types/manifest';
import { createCsvParser } from '@/scripts/data-build/csv-reader';

export async function buildPopulationData(manifest: Manifest): Promise<Record<number, number>> {
  const parser = createCsvParser(manifest.populationFile, manifest.csvOptions);

  let districtNumberColumn: number|null = null;
  let populationColumn: number|null = null;
  let districtTypeColumn: number|null = null;

  const result: Record<number, number> = {};

  for await (const record of parser) {
    if (districtNumberColumn === null) {
      districtNumberColumn = record.indexOf(manifest.populationCsvColumns.districtNumber);
      populationColumn = record.indexOf(manifest.populationCsvColumns.population);
      districtTypeColumn = record.indexOf(manifest.populationCsvColumns.districtType);
    } else {
      const districtNumber = parseInt(record[districtNumberColumn]);
      const population = parseInt(record[populationColumn]);
      const districtType = record[districtTypeColumn];

      if (manifest.populationIgnoreDistrictTypes.includes(districtType)) {
        continue;
      }

      if (isNaN(districtNumber) || isNaN(population)) {
        throw new Error(`Invalid population data for district ${districtNumber}`);
      }

      if (!result[districtNumber]) {
        result[districtNumber] = 0;
      }
      result[districtNumber] += population;
    }
  }

  return result;
}
