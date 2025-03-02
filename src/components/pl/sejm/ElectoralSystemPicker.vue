<script lang="ts" setup>

import TwoColumnForm from '@/components/ui/TwoColumnForm.vue';
</script>

<template>
  <TwoColumnForm>
    <span>{{ $t('pl.sejm.electoralSystem') }}</span>
    <span>{{ $t('pl.sejm.electoralSystemValues.proportional') }}</span>
    <span>{{ $t('pl.sejm.usedAsDistrict') }}</span>
    <span>{{ $t('pl.sejm.usedAsDistrictValues.district') }}</span>
    <span>{{ $t('pl.sejm.seatDistribution') }}</span>
    <span>{{ $t('pl.sejm.seatDistributionValues.dHondt') }}</span>
  </TwoColumnForm>
</template>
