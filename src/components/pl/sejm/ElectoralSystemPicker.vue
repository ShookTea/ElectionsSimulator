<script lang="ts" setup>
import TwoColumnForm from '@/components/ui/TwoColumnForm.vue';
import { ref, watch } from 'vue';
import { PROPORTIONAL_METHODS, ProportionalMethod, ResultMethod } from '@/utils/pl/calculate-results';
import TwoColumnFormSelect from '@/components/ui/TwoColumnFormSelect.vue';
import { UseAsDistrict } from '@/models/pl/sejm';

const seatDistribution = defineModel<ResultMethod>('seatDistribution');
const useAsDistrict = defineModel<UseAsDistrict>('useAsDistrict');

type ElectoralSystem = 'proportional' | 'firstPastThePost';
const electoralSystem = ref<ElectoralSystem>('proportional');

const electoralSystemValues = ref<ElectoralSystem[]>(['proportional', 'firstPastThePost']);
const proportionalMethods = ref<ProportionalMethod[]>(PROPORTIONAL_METHODS);
const useAsDistrictValues = ref<UseAsDistrict[]>(['district', 'gmina']);

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
    <TwoColumnFormSelect
        v-model="useAsDistrict"
        :label="$t('pl.sejm.usedAsDistrict')"
        :options="useAsDistrictValues"
        option-label-prefix="pl.sejm.usedAsDistrictValues."
    />
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
