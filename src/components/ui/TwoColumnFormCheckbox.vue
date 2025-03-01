<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';
import randomId from '@/utils/pl/random-id';

withDefaults(defineProps<{
  label?: string;
  id?: string;
}>(), {
  label: '',
  id: randomId(10),
});

const model = defineModel<boolean>();
</script>

<template>
  <label :for="id">{{ label }}</label>
  <input :id="id" type="checkbox" v-model="model" :key="model ? 'yes' : 'no'"/>
</template>
