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
  <div class="number-of-seats-picker">
    <label for="numberOfSeats">Number of seats:</label>
    <input id="numberOfSeats" type="number" v-model="numberOfSeats" :min="1" :max="99999" />
    <template v-if="showRealSeatsToggle && defaultNumberOfSeats === numberOfSeats">
      <label for="useRealSeats">Use real seats:</label>
      <input id="useRealSeats" type="checkbox" v-model="useRealSeats" :key="useRealSeats ? 'yes' : 'no'" />
      <span class="explanation">
        Seat distribution used during that election was different than what it should be based on the election law.
      </span>
    </template>
  </div>
</template>

<style scoped>
.number-of-seats-picker {
  display: grid;
  grid-template-columns: auto auto;
  row-gap: 0.5rem;
  align-items: center;
}

.explanation {
  font-size: 0.8rem;
  color: #666;
  grid-column: span 2;
  display: block;
}
</style>
