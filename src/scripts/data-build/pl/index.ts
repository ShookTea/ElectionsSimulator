import buildDataForSejm from '@/scripts/data-build/pl/sejm';

export default function buildDataForPoland(dirPath: string) {
  console.log('Building data for Poland started');
  const mainPath = `${dirPath}/pl`;
  buildDataForSejm(mainPath);
  console.log('Building data for Poland completed');
}
