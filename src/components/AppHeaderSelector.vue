<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps<{
  options: string[];
  path: string;
  currentOption: string;
}>();

const onChange = (newVal: string) => {
  router.push(`${props.path}/${newVal}`);
}
</script>

<template>
  <select :value="currentOption" @change="onChange(($event.target as HTMLSelectElement).value)">
    <option v-for="option in props.options" :value="option" :key="option">{{ option }}</option>
  </select>
</template>
