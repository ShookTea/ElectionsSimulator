import buildDataForPoland from '@/scripts/data-build/pl';

buildData();

function buildData(): void {
  const path = 'sourceData';
  buildDataForPoland(path);
}
