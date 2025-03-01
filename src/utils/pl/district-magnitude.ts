import { NumberMap } from '@/models/utils/number-map';

/**
 * Get the district magnitude (number of seats) for each district, based on the population and the total number of seats.
 * It uses the algorithm used in Poland to calculate the number of seats in each district.
 *
 * The algorithm is as follows:
 * 1. Calculate the total population of entire country.
 * 2. Calculate the average number of people per seat.
 * 3. Divide the population of each district by the average number of people per seat - it's called "representation norm" (RN).
 * 4. Round RN to the nearest integer (if it's exactly in the middle, round up).
 * 5. If the sum of all RNs is less than the total number of seats, add 1 to the district with the highest RN.
 * 6. If the sum of all RNs is greater than the total number of seats, subtract 1 from the district with the lowest RN.
 *
 * If there are any districts with overridden number of seats, they will be taken into account instead of the calculated number of seats.
 * @param population Population of each district.
 * @param overrides Number of seats in each district that should be overridden.
 * @param totalSeats Total number of seats in the parliament.
 */
export function getDistrictMagnitude(
  population: NumberMap,
  overrides: NumberMap,
  totalSeats: number,
): NumberMap {
  const totalPopulation = Object.values(population).reduce((a, b) => a + b, 0);
  const averagePeoplePerSeat = totalPopulation / totalSeats;
  const representationNorms: NumberMap = {};
  const result: NumberMap = {};

  for (const key in population) {
    representationNorms[key] = population[key] / averagePeoplePerSeat;
    result[key] = Math.round(representationNorms[key]);
  }

  let totalRepresentationNorms = Object.values(result).reduce((a, b) => a + b, 0);
  while (totalRepresentationNorms > totalSeats) {
    const minKey = Object.keys(representationNorms).reduce((a, b) => representationNorms[a] < representationNorms[b] ? a : b);
    result[minKey]--;
    totalRepresentationNorms--;
  }
  while (totalRepresentationNorms < totalSeats) {
    const maxKey = Object.keys(representationNorms).reduce((a, b) => representationNorms[a] > representationNorms[b] ? a : b);
    result[maxKey]++;
    totalRepresentationNorms++;
  }

  for (const key in overrides) {
    result[key] = overrides[key];
  }

  return result;
}
