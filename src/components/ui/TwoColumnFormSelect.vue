<script lang="ts" generic="T extends string" setup>
import { defineProps, withDefaults } from 'vue';
import randomId from '@/utils/pl/random-id';

withDefaults(defineProps<{
  label?: string;
  id?: string;
  options: T[];
  optionLabelPrefix: string;
}>(), {
  label: '',
  id: randomId(10),
});

const model = defineModel<T>();

</script>

<template>
  <label :for="id">{{ label }}</label>
  <select :id="id" v-model="model">
    <option
        v-for="option in options"
        :value="option"
        :key="option"
    >
      {{ $t(optionLabelPrefix + option) }}
    </option>
  </select>
</template>
