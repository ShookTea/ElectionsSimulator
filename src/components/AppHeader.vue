<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import AppHeaderSelector from '@/components/AppHeaderSelector.vue';
import LanguagePicker from '@/components/LanguagePicker.vue';

const route = useRoute();

const country = computed(() => route.path.split('/')[1] ?? '');
const electionType = computed(() => route.path.split('/')[2] ?? '');
const year = computed(() => route.path.split('/')[3] ?? '');

const options = ref({
  'pl': {
    'sejm': ['2019', '2023'],
  }
});

</script>
<template>
  <header>
    <div class="header-main">
      <h1>
        {{ $t('app.title') }}
      </h1>
      <div class="header-selector">
        <span>Polish elections to Sejm in</span>
        <AppHeaderSelector :options="options.pl.sejm" :path="`/${country}/${electionType}`" :current-option="year" />
      </div>
    </div>
    <div class="language-picker">
      Language: <LanguagePicker />
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
  justify-content: space-between;
}

.header-main {
  display: flex;
  flex-direction: row;
  justify-content: left;
  gap: 2em;
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
  height: 100%;
  gap: 0.3rem;
}

.language-picker {
  margin-right: 3rem;
}
</style>
