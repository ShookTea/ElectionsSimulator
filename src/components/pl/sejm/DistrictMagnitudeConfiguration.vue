<script lang="ts" setup>
import { Sejm } from '@/models/pl/sejm';
import { NumberMap } from '@/models/utils/number-map';
import { computed, ref, watch } from 'vue';
import { getDistrictMagnitude } from '@/utils/pl/district-magnitude';
import NumberOfSeatsPicker from '@/components/pl/sejm/NumberOfSeatsPicker.vue';

const props = defineProps<{
  data: Sejm
}>();

const model = defineModel<NumberMap>();

const mandateOverrides = computed<NumberMap>(() => {
  return props.data.districtResults.reduce((acc, districtResult) => {
    if (districtResult.numberOfMandatesUsed) {
      acc[districtResult.districtNumber] = districtResult.numberOfMandatesUsed;
    }
    return acc;
  }, {} as NumberMap);
});

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

const numberOfSeats = ref<number>(460);
const useRealSeats = ref<boolean>(true);

model.value = seatDistribution.value;
watch(() => seatDistribution.value, (newValue) => {
  model.value = newValue;
})
</script>

<template>
  <NumberOfSeatsPicker
      :default-number-of-seats="460"
      :show-real-seats-toggle="Object.keys(mandateOverrides).length > 0"
      :override-reason="data.mandateOverrideReason"
      v-model:number-of-seats="numberOfSeats"
      v-model:use-real-seats="useRealSeats"
  />
</template>
