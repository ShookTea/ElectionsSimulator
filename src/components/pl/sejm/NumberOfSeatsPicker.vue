<script lang="ts" setup>
import { watch } from 'vue';
import TwoColumnForm from '@/components/ui/TwoColumnForm.vue';
import TwoColumnFormLabel from '@/components/ui/TwoColumnFormLabel.vue';
import TwoColumnFormNumber from '@/components/ui/TwoColumnFormNumber.vue';
import TwoColumnFormCheckbox from '@/components/ui/TwoColumnFormCheckbox.vue';

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
  <TwoColumnForm>
    <TwoColumnFormNumber label="Number of seats" v-model="numberOfSeats" :min="1" />
    <template v-if="showRealSeatsToggle && defaultNumberOfSeats === numberOfSeats">
      <TwoColumnFormLabel>
        Seat distribution used during that election was different than what it should be based on the election law.
      </TwoColumnFormLabel>
      <TwoColumnFormCheckbox label="Use real seats" v-model="useRealSeats"/>
    </template>
  </TwoColumnForm>
</template>

