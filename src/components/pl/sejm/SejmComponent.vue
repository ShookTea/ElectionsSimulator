<script lang="ts" setup>
import { Sejm } from '@/models/pl/sejm';
import { ref } from 'vue';
import NumberOfSeatsPicker from '@/components/pl/sejm/NumberOfSeatsPicker.vue';

const props = defineProps<{
  data: Sejm
}>();

const numberOfSeats = ref<number>(460);
const useRealSeats = ref<boolean>(true);

</script>

<template>
  <div>
    <NumberOfSeatsPicker
        :default-number-of-seats="460"
        :show-real-seats-toggle="true"
        v-model:number-of-seats="numberOfSeats"
        v-model:use-real-seats="useRealSeats"/>
    {{ numberOfSeats }} {{ useRealSeats }}
  </div>
</template>
