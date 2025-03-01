<script lang="ts" setup>
const mainThreshold = defineModel<number>('mainThreshold');
const coalitionThreshold = defineModel<number>('coalitionThreshold');
const nationalMinorityThreshold = defineModel<number>('nationalMinorityThreshold');
</script>

<template>
  <div>
    <div>
      <label for="mainThreshold">Main threshold:</label>
      <input type="number" id="mainThreshold" v-model="mainThreshold" :min="0" :max="100"/>%
    </div>
    <div>
      <label for="coalitionThreshold">Coalition threshold:</label>
      <input type="number" id="coalitionThreshold" v-model="coalitionThreshold" :min="0" :max="100"/>%
    </div>
    <div>
      <label for="nationalMinorityThreshold">National minority threshold:</label>
      <input type="number" id="nationalMinorityThreshold" v-model="nationalMinorityThreshold" :min="0" :max="100"/>%
    </div>
  </div>
</template>
