<script lang="ts" setup>
import { PartyAbbreviation, PartyDefinition } from '@/models/pl/party-definition';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, ArcElement, ChartData } from 'chart.js';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();
ChartJS.register(Title, Tooltip, Legend, CategoryScale, ArcElement);

const props = defineProps<{
  parties: PartyDefinition[];
  allowedParties: PartyAbbreviation[];
  mandatesByParty: Record<PartyAbbreviation, number>;
}>();

const options = ref({
  responsive: true,
  circumference: 180,
  rotation: 270,
});

const chartLabels = computed<string[]>(() => {
  const labels: string[] = [];
  props.allowedParties.forEach((partyAbbr) => {
    if (props.mandatesByParty[partyAbbr] > 0) {
      labels.push(partyAbbr);
    }
  });
  return labels;
});

const chartColors = computed<string[]>(() => {
  const colors: string[] = [];
  props.allowedParties.forEach((partyAbbr) => {
    if (props.mandatesByParty[partyAbbr] > 0) {
      colors.push(props.parties.find(p => p.abbreviation === partyAbbr)?.color ?? '#999999');
    }
  });
  return colors;
});

const chartValues = computed<number[]>(() => {
  const values: number[] = [];
  props.allowedParties.forEach((partyAbbr) => {
    if (props.mandatesByParty[partyAbbr] > 0) {
      values.push(props.mandatesByParty[partyAbbr]);
    }
  });
  return values;
});


const chartData = computed<ChartData<'doughnut'>>(() => {
  return {
    labels: chartLabels.value,
    datasets: [{
      label: i18n.t('pl.sejm.partySeats'),
      data: chartValues.value,
      backgroundColor: chartColors.value,
      hoverOffset: 4
    }]
  };
});
</script>

<template>
  <div class="party-chart">
    <Doughnut id="polish-sejm-party-chart" :options="options" :data="chartData"/>
  </div>
</template>

<style scoped>
.party-chart {
  max-height: 300px;
  display: flex;
  justify-content: center;
}
</style>
