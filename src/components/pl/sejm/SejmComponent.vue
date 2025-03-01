<script lang="ts" setup>
import { Sejm } from '@/models/pl/sejm';
import { ref } from 'vue';
import { NumberMap } from '@/models/utils/number-map';
import DistrictMagnitudeConfiguration from '@/components/pl/sejm/DistrictMagnitudeConfiguration.vue';
import ThresholdPicker from '@/components/pl/sejm/ThresholdPicker.vue';

const props = defineProps<{
  data: Sejm
}>();

const seatDistribution = ref<NumberMap>({});
const mainThreshold = ref<number>(5);
const coalitionThreshold = ref<number>(8);
const nationalMinorityThreshold = ref<number>(0);
</script>

<template>
  <div>
    <DistrictMagnitudeConfiguration :data="props.data" v-model="seatDistribution"/>
    <ThresholdPicker
        v-model:main-threshold="mainThreshold"
        v-model:coalition-threshold="coalitionThreshold"
        v-model:national-minority-threshold="nationalMinorityThreshold"
    />
    {{ seatDistribution }}
  </div>
</template>
