import buildDataForSejm from '@/scripts/data-build/pl/sejm';

export default async function buildDataForPoland(): Promise<void> {
  console.log('Building data for Poland started');
  await buildDataForSejm();
  console.log('Building data for Poland completed');
}
