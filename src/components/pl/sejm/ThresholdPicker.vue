<script lang="ts" setup>
import TwoColumnForm from '@/components/ui/TwoColumnForm.vue';
import TwoColumnFormNumber from '@/components/ui/TwoColumnFormNumber.vue';

const mainThreshold = defineModel<number>('mainThreshold');
const coalitionThreshold = defineModel<number>('coalitionThreshold');
const nationalMinorityThreshold = defineModel<number>('nationalMinorityThreshold');
</script>

<template>
  <TwoColumnForm>
    <TwoColumnFormNumber label="Main threshold" v-model="mainThreshold" :min="0" :max="100" postfix="%" />
    <TwoColumnFormNumber label="Coalition threshold" v-model="coalitionThreshold" :min="0" :max="100" postfix="%" />
    <TwoColumnFormNumber label="National minority threshold" v-model="nationalMinorityThreshold" :min="0" :max="100" postfix="%" />
  </TwoColumnForm>
</template>
