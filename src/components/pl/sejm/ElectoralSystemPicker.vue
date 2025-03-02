<script lang="ts" setup>
import TwoColumnForm from '@/components/ui/TwoColumnForm.vue';
import { ref } from 'vue';
import { HighestAveragesMethod } from '@/utils/pl/calculate-results';
import TwoColumnFormSelect from '@/components/ui/TwoColumnFormSelect.vue';

const seatDistribution = ref<HighestAveragesMethod>('dHondt');
const seatDistributionOptions = ref<HighestAveragesMethod[]>(['dHondt', 'SainteLague', 'HuntingtonHill']);
</script>

<template>
  <TwoColumnForm>
    <span>{{ $t('pl.sejm.electoralSystem') }}</span>
    <span>{{ $t('pl.sejm.electoralSystemValues.proportional') }}</span>
    <span>{{ $t('pl.sejm.usedAsDistrict') }}</span>
    <span>{{ $t('pl.sejm.usedAsDistrictValues.district') }}</span>
    <TwoColumnFormSelect
        v-model="seatDistribution"
        :label="$t('pl.sejm.seatDistribution')"
        option-label-prefix="pl.sejm.seatDistributionValues."
        :options="seatDistributionOptions"
    />
  </TwoColumnForm>
</template>
