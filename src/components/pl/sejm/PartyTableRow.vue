<script lang="ts" setup>
import { PartyAbbreviation, PartyDefinition } from '@/models/pl/party-definition';
import { computed } from 'vue';

const props = defineProps<{
  partyAbbreviation: string;
  parties: PartyDefinition[];
  mandatesByParty: Record<PartyAbbreviation, number>;
}>();

const currentParty = computed<PartyDefinition>(() => {
  return props.parties.find(p => p.abbreviation === props.partyAbbreviation);
});

</script>

<template>
  <tr>
    <td class="party-color" :style="{
          'background-color': currentParty.color
        }"></td>
    <td>
      <div class="party-name">
        <span>{{ currentParty.name }}</span>
        <span
            v-if="$te(`pl.parties.${currentParty.translationKey ?? currentParty.name}`)"
            class="party-name-translated"
        >
              {{ $t(`pl.parties.${currentParty.translationKey ?? currentParty.name}`) }}
            </span>
      </div>
    </td>
    <td>{{ currentParty.abbreviation }}</td>
    <td>{{ mandatesByParty[currentParty.abbreviation] ?? 0 }}</td>
  </tr>
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

.party-color {
  width: 5px;
}

.party-name {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-left: 1em;
}

.party-name-translated {
  font-size: 0.8em;
  color: #666;
}
</style>
