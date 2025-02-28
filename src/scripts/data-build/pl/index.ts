import buildDataForSejm from '@/scripts/data-build/pl/sejm';

export default async function buildDataForPoland(dirPath: string): Promise<void> {
  console.log('Building data for Poland started');
  const mainPath = `${dirPath}/pl`;
  await buildDataForSejm(mainPath);
  console.log('Building data for Poland completed');
}
