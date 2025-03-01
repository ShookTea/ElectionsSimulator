<script lang="ts" setup>
import { Sejm } from '@/models/pl/sejm';
import { computed, ref } from 'vue';
import { NumberMap } from '@/models/utils/number-map';
import DistrictMagnitudeConfiguration from '@/components/pl/sejm/DistrictMagnitudeConfiguration.vue';
import ThresholdPicker from '@/components/pl/sejm/ThresholdPicker.vue';
import PartyTable from '@/components/pl/sejm/PartyTable.vue';
import { getPartiesAboveThreshold } from '@/utils/pl/parties-above-threshold';
import { PartyAbbreviation } from '@/models/pl/party-definition';
import { calculateResults } from '@/utils/pl/calculate-results';

const props = defineProps<{
  data: Sejm
}>();

const seatDistribution = ref<NumberMap>({});
const mainThreshold = ref<number>(5);
const coalitionThreshold = ref<number>(8);
const nationalMinorityThreshold = ref<number>(0);

const partyAbbreviationsAboveThreshold = computed<string[]>(() => {
  return getPartiesAboveThreshold(
      props.data.partyDefinitions,
      props.data.districtResults,
      mainThreshold.value,
      coalitionThreshold.value,
      nationalMinorityThreshold.value,
  );
});

const finalResultsByParty = computed<Record<PartyAbbreviation, number>>(() => {
  return calculateResults(
      seatDistribution.value,
      props.data.districtResults,
      partyAbbreviationsAboveThreshold.value,
      'DHondt'
  );
});
</script>

<template>
  <div>
    <DistrictMagnitudeConfiguration :data="props.data" v-model="seatDistribution"/>
    <ThresholdPicker
        v-model:main-threshold="mainThreshold"
        v-model:coalition-threshold="coalitionThreshold"
        v-model:national-minority-threshold="nationalMinorityThreshold"
    />
    <PartyTable :parties="props.data.partyDefinitions" />
    {{finalResultsByParty}}
  </div>
</template>
