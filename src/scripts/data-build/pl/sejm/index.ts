import * as fs from 'node:fs';

export default function buildDataForSejm(dirPath: string): void {
  console.log('Building data for Sejm');
  const path = `${dirPath}/sejm`;

  fs.readdirSync(path).forEach((yearFile) => {
    const [year, extension] = yearFile.split('.');
    const yearNumber = parseInt(year);
    if (extension === 'json') {
      buildForYear(yearNumber, `${path}/${yearFile}`);
    }
  });
}

function buildForYear(year: number, path: string): void {
  console.log('Building data for Sejm year', year);
  const result = fs.readFileSync(path, 'utf8');
  console.log(result);
}
