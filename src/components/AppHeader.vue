<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import AppHeaderSelector from '@/components/AppHeaderSelector.vue';

const route = useRoute();
const [country, electionType, year] = route.path.split('/').slice(1);

const options = ref({
  'pl': {
    'sejm': ['2019', '2023'],
  }
});

</script>
<template>
  <header>
    <h1>
      Elections Simulator
    </h1>
    <div class="header-selector">
      <span>Polish elections of Sejm in</span>
      <AppHeaderSelector :options="options.pl.sejm" path="/pl/sejm" :current-option="year" />
    </div>
  </header>
</template>

<style>
header {
  background-color: #333;
  color: white;
  padding: 1rem 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: left;
}

h1 {
  margin: 0 0 0 3rem;
  font-size: 1.5rem;
}

.header-selector {
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.1rem;
}
</style>
