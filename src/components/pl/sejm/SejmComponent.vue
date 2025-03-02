<script lang="ts" setup>
import { DistrictResult, Sejm, UseAsDistrict } from '@/models/pl/sejm';
import { computed, ref } from 'vue';
import { NumberMap } from '@/models/utils/number-map';
import DistrictMagnitudeConfiguration from '@/components/pl/sejm/DistrictMagnitudeConfiguration.vue';
import ThresholdPicker from '@/components/pl/sejm/ThresholdPicker.vue';
import PartyTable from '@/components/pl/sejm/PartyTable.vue';
import { getPartiesAboveThreshold } from '@/utils/pl/parties-above-threshold';
import { PartyAbbreviation } from '@/models/pl/party-definition';
import { calculateResults, PROPORTIONAL_METHODS, ResultMethod } from '@/utils/pl/calculate-results';
import PartyChart from '@/components/pl/sejm/PartyChart.vue';
import ElectoralSystemPicker from '@/components/pl/sejm/ElectoralSystemPicker.vue';

const props = defineProps<{
  data: Sejm
}>();

const seatDistributionMethod = ref<ResultMethod>('dHondt');
const useAsDistrict = ref<UseAsDistrict>('district');
const seatDistribution = ref<NumberMap>({});
const mainThreshold = ref<number>(5);
const coalitionThreshold = ref<number>(8);
const nationalMinorityThreshold = ref<number>(0);

const districtResultsToBeUsed = computed<DistrictResult[]>(() => {
  if (useAsDistrict.value === 'district') {
    return props.data.districtResults;
  }
  return props.data.gminaResults;
})

const partyAbbreviationsAboveThreshold = computed<string[]>(() => {
  return getPartiesAboveThreshold(
      props.data.partyDefinitions,
      districtResultsToBeUsed.value,
      mainThreshold.value,
      coalitionThreshold.value,
      nationalMinorityThreshold.value,
  );
});

const finalResultsByParty = computed<Record<PartyAbbreviation, number>>(() => {
  return calculateResults(
      seatDistribution.value,
      districtResultsToBeUsed.value,
      partyAbbreviationsAboveThreshold.value,
      seatDistributionMethod.value,
  );
});
</script>

<template>
  <div class="sejm-component-root">
    <div class="sejm-component">
      <ElectoralSystemPicker
          v-model:seat-distribution="seatDistributionMethod"
          v-model:use-as-district="useAsDistrict"
      />
      <DistrictMagnitudeConfiguration
          v-if="(PROPORTIONAL_METHODS as ResultMethod[]).includes(seatDistributionMethod)"
          :data="props.data"
          v-model="seatDistribution"
      />
      <ThresholdPicker
          v-model:main-threshold="mainThreshold"
          v-model:coalition-threshold="coalitionThreshold"
          v-model:national-minority-threshold="nationalMinorityThreshold"
      />
      <PartyChart
          :parties="props.data.partyDefinitions"
          :allowed-parties="partyAbbreviationsAboveThreshold"
          :mandates-by-party="finalResultsByParty"
      />
      <PartyTable
          :parties="props.data.partyDefinitions"
          :allowed-parties="partyAbbreviationsAboveThreshold"
          :mandates-by-party="finalResultsByParty"
      />
    </div>
  </div>
</template>

<style scoped>
.sejm-component-root {
  width: 100%;
  display: flex;
  justify-content: center;
}
.sejm-component {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
  margin: 1rem 0 5rem 0;
  width: 40%;
}

@media (max-width: 768px) {
  .sejm-component {
    width: 100%;
    padding: 0 4em;
  }
}
</style>
