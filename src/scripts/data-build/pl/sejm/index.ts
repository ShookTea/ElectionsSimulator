import * as fs from 'node:fs';
import { Manifest } from '@/scripts/data-build/pl/sejm/types/manifest';
import * as path from 'node:path';
import { parse, Parser } from 'csv-parse';
import { HeaderConfig } from '@/scripts/data-build/pl/sejm/types/header-config';

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
  let headerConfig: HeaderConfig|null = null;

  for await (const record of parser) {
    if (!headerConfig) {
      headerConfig = buildHeaderConfig(record, manifest);
    } else {
      console.log(record);
    }
  }
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
    to: 1,
  }));
}

function loadManifestFromFile(path: string): Manifest {
  return JSON.parse(fs.readFileSync(path, 'utf8')) as Manifest;
}
