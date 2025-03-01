<script lang="ts" setup>
import TwoColumnForm from '@/components/ui/TwoColumnForm.vue';
import TwoColumnFormNumber from '@/components/ui/TwoColumnFormNumber.vue';

const mainThreshold = defineModel<number>('mainThreshold');
const coalitionThreshold = defineModel<number>('coalitionThreshold');
const nationalMinorityThreshold = defineModel<number>('nationalMinorityThreshold');
</script>

<template>
  <TwoColumnForm>
    <TwoColumnFormNumber
        :label="$t('pl.sejm.mainThreshold')"
        v-model="mainThreshold"
        :min="0"
        :max="100"
        postfix="%"
    />
    <TwoColumnFormNumber
        :label="$t('pl.sejm.coalitionThreshold')"
        v-model="coalitionThreshold"
        :min="0"
        :max="100"
        postfix="%"
    />
    <TwoColumnFormNumber
        :label="$t('pl.sejm.nationalMinorityThreshold')"
        v-model="nationalMinorityThreshold"
        :min="0"
        :max="100"
        postfix="%"
    />
  </TwoColumnForm>
</template>
