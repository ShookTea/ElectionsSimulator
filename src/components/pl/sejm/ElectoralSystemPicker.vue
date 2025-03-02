<script lang="ts" setup>
import TwoColumnForm from '@/components/ui/TwoColumnForm.vue';
import { ref, watch } from 'vue';
import { ProportionalMethod, ResultMethod } from '@/utils/pl/calculate-results';
import TwoColumnFormSelect from '@/components/ui/TwoColumnFormSelect.vue';

const seatDistribution = defineModel<ResultMethod>('seatDistribution');

type ElectoralSystem = 'proportional' | 'firstPastThePost';
const electoralSystem = ref<ElectoralSystem>('proportional');

const electoralSystemValues = ref<ElectoralSystem[]>(['proportional', 'firstPastThePost']);
const proportionalMethods = ref<ProportionalMethod[]>(['dHondt', 'SainteLague', 'HuntingtonHill']);

watch(() => seatDistribution.value, (newValue) => {
  if (newValue === 'fptp') {
    electoralSystem.value = 'firstPastThePost';
  } else if (proportionalMethods.value.includes(newValue)) {
    electoralSystem.value = 'proportional';
  }
});

watch(() => electoralSystem.value, (newValue) => {
  if (newValue === 'firstPastThePost') {
    seatDistribution.value = 'fptp';
  } else if (newValue === 'proportional') {
    seatDistribution.value = 'dHondt';
  }
});
</script>

<template>
  <TwoColumnForm>
    <TwoColumnFormSelect
        v-model="electoralSystem"
        :label="$t('pl.sejm.electoralSystem')"
        :options="electoralSystemValues"
        option-label-prefix="pl.sejm.electoralSystemValues."
    />
    <span>{{ $t('pl.sejm.usedAsDistrict') }}</span>
    <span>{{ $t('pl.sejm.usedAsDistrictValues.district') }}</span>
    <TwoColumnFormSelect
        v-if="electoralSystem === 'proportional'"
        v-model="seatDistribution"
        :label="$t('pl.sejm.seatDistribution')"
        option-label-prefix="pl.sejm.seatDistributionValues."
        :options="proportionalMethods"
    />
    <span>{{ seatDistribution }}</span>
  </TwoColumnForm>
</template>
