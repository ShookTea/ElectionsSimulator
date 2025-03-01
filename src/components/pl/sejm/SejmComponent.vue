<script lang="ts" setup>
import { Sejm } from '@/models/pl/sejm';
import { ref } from 'vue';
import { NumberMap } from '@/models/utils/number-map';
import DistrictMagnitudeConfiguration from '@/components/pl/sejm/DistrictMagnitudeConfiguration.vue';

const props = defineProps<{
  data: Sejm
}>();

const seatDistribution = ref<NumberMap>({});
</script>

<template>
  <div>
    <DistrictMagnitudeConfiguration :data="props.data" v-model="seatDistribution"/>
    {{ seatDistribution }}
  </div>
</template>
