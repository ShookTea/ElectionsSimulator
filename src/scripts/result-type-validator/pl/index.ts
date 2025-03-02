import { validateDataForSejm } from '@/scripts/result-type-validator/pl/sejm';

export async function validateDataForPoland(): Promise<void> {
  console.log('Validating data for Poland started');
  await validateDataForSejm();
  console.log('Validating data for Poland completed');
}
