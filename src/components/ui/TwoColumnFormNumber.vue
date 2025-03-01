<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';
import randomId from '@/utils/pl/random-id';

withDefaults(defineProps<{
  label?: string;
  postfix?: string;
  id?: string;
  min?: number;
  max?: number;
}>(), {
  label: '',
  postfix: '',
  id: randomId(10),
  min: Number.MIN_VALUE,
  max: Number.MAX_VALUE,
});

const model = defineModel<number>();
</script>

<template>
  <label :for="id">{{ label }}</label>
  <div class="two-column-form-number-input">
    <input :id="id" type="number" v-model="model" :min="min" :max="max" />
    <span v-if="postfix">{{ postfix }}</span>
  </div>
</template>

<style>
.two-column-form-number-input {
  display: flex;
  align-items: stretch;
}

.two-column-form-number-input input {
  flex-grow: 1;
}
</style>
