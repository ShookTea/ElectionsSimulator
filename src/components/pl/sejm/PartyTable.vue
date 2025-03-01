<script lang="ts" setup>
import { PartyDefinition } from '@/models/pl/party-definition';

defineProps<{
  parties: PartyDefinition[];
}>();
</script>

<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Party</th>
        <th>Seats</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="party in parties" :key="party.abbreviation">
        <td class="party-color" :style="{
          'background-color': party.color
        }"></td>
        <td>{{ party.name }}</td>
        <td>0</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.party-color {
  width: 5px;
}
</style>
