<script lang="ts" setup>
import { PartyAbbreviation, PartyDefinition } from '@/models/pl/party-definition';
import { computed } from 'vue';

const props = defineProps<{
  parties: PartyDefinition[];
  allowedParties: PartyAbbreviation[];
  mandatesByParty: Record<PartyAbbreviation, number>;
}>();

const partiesWithVotes = computed<PartyAbbreviation[]>(() => {
  return props.allowedParties.filter(party => props.mandatesByParty[party] > 0);
})
</script>

<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>{{ $t('pl.sejm.partyName') }}</th>
        <th>{{ $t('pl.sejm.partyAbbreviation') }}</th>
        <th>{{ $t('pl.sejm.partySeats') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="party in partiesWithVotes" :key="party">
        <td class="party-color" :style="{
          'background-color': parties.find(p => p.abbreviation === party)?.color
        }"></td>
        <td>{{ parties.find(p => p.abbreviation === party)?.name }}</td>
        <td>{{ party }}</td>
        <td>{{ mandatesByParty[party] ?? 0 }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}

th, td {
  padding: 5px;
}

.party-color {
  width: 5px;
}
</style>
