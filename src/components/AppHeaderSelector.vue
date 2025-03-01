<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
  options: string[];
  path: string;
  currentOption: string;
}>();
</script>

<template>
  <select :value="currentOption">
    <option v-for="option in props.options" :value="option" :key="option">{{ option }}</option>
  </select>
</template>
