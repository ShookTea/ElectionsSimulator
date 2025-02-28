import { parse, Parser } from 'csv-parse';
import fs from 'node:fs';

export type CsvOptions = {
  bom?: boolean;
  quote?: string;
  delimiter?: string;
  recordDelimiter?: string;
}

export function createCsvParser(file: string, options: CsvOptions): Parser {
  return fs.createReadStream(file, 'utf-8').pipe(parse({
    bom:options.bom,
    quote:options.quote,
    delimiter:options.delimiter,
    record_delimiter:options.recordDelimiter,
    trim: true,
  }));
}
