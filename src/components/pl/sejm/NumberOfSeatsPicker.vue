<script lang="ts" setup>
import { watch } from 'vue';

const props = defineProps<{
  defaultNumberOfSeats: number;
  showRealSeatsToggle: boolean;
}>();

const numberOfSeats = defineModel<number>('numberOfSeats');
const useRealSeats = defineModel<boolean>('useRealSeats');

watch(() => numberOfSeats.value, (newValue) => {
  useRealSeats.value = newValue === props.defaultNumberOfSeats;
});
</script>

<template>
  <div>
    <label for="numberOfSeats">Number of seats:</label>
    <input id="numberOfSeats" type="number" v-model="numberOfSeats" :min="1" :max="99999" />
    <div v-if="showRealSeatsToggle && defaultNumberOfSeats === numberOfSeats">
      <label for="useRealSeats">Use real seats:</label>
      <input id="useRealSeats" type="checkbox" v-model="useRealSeats" :key="useRealSeats ? 'yes' : 'no'" />
    </div>
  </div>
</template>
