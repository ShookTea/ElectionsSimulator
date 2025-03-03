<script lang="ts" setup>
import { PartyAbbreviation, PartyDefinition } from '@/models/pl/party-definition';
import { computed } from 'vue';
import PartyTableRow from '@/components/pl/sejm/PartyTableRow.vue';

const props = defineProps<{
  parties: PartyDefinition[];
  allowedParties: PartyAbbreviation[];
  mandatesByParty: Record<PartyAbbreviation, number>;
}>();

const partiesWithVotes = computed<PartyAbbreviation[]>(() => {
  const result = [...props.allowedParties.filter(party => props.mandatesByParty[party] > 0)];
  result.sort((a, b) => props.mandatesByParty[b] - props.mandatesByParty[a]);
  return result;
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
    <PartyTableRow
        v-for="party in partiesWithVotes"
        :key="party"
        :party-abbreviation="party"
        :parties="parties"
        :mandates-by-party="mandatesByParty"
    />
    </tbody>
  </table>
</template>

<style scoped>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
  text-align: center;
}

th, td {
  padding: 5px;
}
</style>
