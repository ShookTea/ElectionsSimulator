import buildDataForPoland from '@/scripts/data-build/pl';

async function buildData(): Promise<void> {
  const path = 'sourceData';
  await buildDataForPoland(path);
}

(async () => {
  await buildData();
})();
