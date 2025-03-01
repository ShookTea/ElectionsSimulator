<script lang="ts" setup>
import { PartyAbbreviation, PartyDefinition } from '@/models/pl/party-definition';

defineProps<{
  parties: PartyDefinition[];
  allowedParties: PartyAbbreviation[];
  mandatesByParty: Record<PartyAbbreviation, number>;
}>();
</script>

<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Party</th>
        <th>Abbr</th>
        <th>Seats</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="party in allowedParties" :key="party">
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
