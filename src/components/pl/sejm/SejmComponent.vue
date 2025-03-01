<script lang="ts" setup>
import { Sejm } from '@/models/pl/sejm';
import { computed, ref } from 'vue';
import NumberOfSeatsPicker from '@/components/pl/sejm/NumberOfSeatsPicker.vue';
import { getDistrictMagnitude } from '@/utils/pl/district-magnitude';
import { NumberMap } from '@/models/utils/number-map';

const props = defineProps<{
  data: Sejm
}>();

const mandateOverrides = computed<NumberMap>(() => {
  return props.data.districtResults.reduce((acc, districtResult) => {
    if (districtResult.numberOfMandatesUsed) {
      acc[districtResult.districtNumber] = districtResult.numberOfMandatesUsed;
    }
    return acc;
  }, {} as NumberMap);
});

const numberOfSeats = ref<number>(460);
const useRealSeats = ref<boolean>(true);

const populationMap = computed<NumberMap>(() => {
  return props.data.districtResults.reduce((acc, districtResult) => {
    acc[districtResult.districtNumber] = districtResult.population;
    return acc;
  }, {} as NumberMap);
});

const seatDistribution = computed<NumberMap>(() => {
  return getDistrictMagnitude(
      populationMap.value,
      useRealSeats.value ? mandateOverrides.value : {},
      numberOfSeats.value,
  );
});

</script>

<template>
  <div>
    <NumberOfSeatsPicker
        :default-number-of-seats="460"
        :show-real-seats-toggle="Object.keys(mandateOverrides).length > 0"
        v-model:number-of-seats="numberOfSeats"
        v-model:use-real-seats="useRealSeats"/>
    {{ seatDistribution }}
  </div>
</template>
