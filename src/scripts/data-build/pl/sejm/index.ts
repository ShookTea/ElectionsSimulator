import * as fs from 'node:fs';
import { Manifest } from '@/scripts/data-build/pl/sejm/types/manifest';
import * as path from 'node:path';
import { parse, Parser } from 'csv-parse';

export default async function buildDataForSejm(dirPath: string): Promise<void> {
  console.log('Building data for Sejm');
  const path = `${dirPath}/sejm`;

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

  const parser = createCsvParserForManifest(dataPath, manifest);
  let headerRow: string[] | null = null;

  for await (const record of parser) {
    if (!headerRow) {
      headerRow = record;
      console.log(headerRow);
    } else {
      console.log(record);
    }
  }
}

function createCsvParserForManifest(dataPath: string, manifest: Manifest): Parser {
  return fs.createReadStream(dataPath, 'utf-8').pipe(parse({
    bom: manifest.csvOptions.bom,
    quote: manifest.csvOptions.quote,
    delimiter: manifest.csvOptions.delimiter,
    record_delimiter: manifest.csvOptions.recordDelimiter,
    trim: true,
    to: 1,
  }));
}

function loadManifestFromFile(path: string): Manifest {
  return JSON.parse(fs.readFileSync(path, 'utf8')) as Manifest;
}
