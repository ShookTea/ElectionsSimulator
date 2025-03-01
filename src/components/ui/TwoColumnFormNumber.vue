<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';
import randomId from '@/utils/pl/random-id';

withDefaults(defineProps<{
  label?: string;
  id?: string;
  min?: number;
  max?: number;
}>(), {
  label: '',
  id: randomId(10),
  min: Number.MIN_VALUE,
  max: Number.MAX_VALUE,
});

const model = defineModel<number>();
</script>

<template>
  <label :for="id">{{ label }}</label>
  <input :id="id" type="number" v-model="model" :min="min" :max="max" />
</template>
