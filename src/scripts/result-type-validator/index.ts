import { validateDataForPoland } from '@/scripts/result-type-validator/pl';

async function validateData(): Promise<void> {
  await validateDataForPoland();
}

(async () => {
  await validateData();
})();
