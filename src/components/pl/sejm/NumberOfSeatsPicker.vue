<script lang="ts" setup>
import { watch } from 'vue';
import TwoColumnForm from '@/components/ui/TwoColumnForm.vue';
import TwoColumnFormLabel from '@/components/ui/TwoColumnFormLabel.vue';
import TwoColumnFormNumber from '@/components/ui/TwoColumnFormNumber.vue';
import TwoColumnFormCheckbox from '@/components/ui/TwoColumnFormCheckbox.vue';
import { MandateOverrideReason } from '@/models/pl/sejm';

const props = defineProps<{
  overrideReason: MandateOverrideReason;
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
    <TwoColumnFormLabel v-if="overrideReason === 'lack_of_data'">
      {{ $t('pl.sejm.realSeatsExplanation.lackOfData') }}
    </TwoColumnFormLabel>
    <TwoColumnFormNumber :label="$t('pl.sejm.numberOfSeats')" v-model="numberOfSeats" :min="1" />
    <template v-if="showRealSeatsToggle && defaultNumberOfSeats === numberOfSeats">
      <TwoColumnFormCheckbox :label="$t('pl.sejm.useRealSeats')" v-model="useRealSeats"/>
      <TwoColumnFormLabel v-if="overrideReason === 'wrong_data'">
        {{ $t('pl.sejm.realSeatsExplanation.wrongData') }}
      </TwoColumnFormLabel>
    </template>
  </TwoColumnForm>
</template>

