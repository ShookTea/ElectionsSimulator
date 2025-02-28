import buildDataForPoland from '@/scripts/data-build/pl';

async function buildData(): Promise<void> {
  await buildDataForPoland();
}

(async () => {
  await buildData();
})();
