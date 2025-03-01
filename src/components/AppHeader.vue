<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import AppHeaderSelector from '@/components/AppHeaderSelector.vue';
import LanguagePicker from '@/components/LanguagePicker.vue';
import AppHeaderOutsideButton from '@/components/AppHeaderOutsideButton.vue';

const route = useRoute();

const country = computed(() => route.path.split('/')[1] ?? '');
const electionType = computed(() => route.path.split('/')[2] ?? '');
const year = computed(() => route.path.split('/')[3] ?? '');

const options = ref({
  'pl': {
    'sejm': [ '2015', '2019', '2023' ],
  },
});

</script>
<template>
  <header>
    <div class="header-main">
      <h1>
        {{ $t('app.title') }}
      </h1>
      <div class="header-selector">
        <span>{{ $t('app.viewSelector.prefix') }}</span>
        <AppHeaderSelector :options="options.pl.sejm" :path="`/${country}/${electionType}`" :current-option="year"/>
        <span>{{ $t('app.viewSelector.afterYear') }}</span>
      </div>
    </div>
    <div class="right-side">
      <div class="language-picker">
        <v-icon name="md-language"/>
        <LanguagePicker/>
      </div>
      <AppHeaderOutsideButton
          label="Donate"
          icon="bi-heart-fill"
          background-color="lightblue"
          text-color="black"
          icon-color="deeppink"
          link="https://github.com/sponsors/ShookTea"
      />
      <AppHeaderOutsideButton
          label="GitHub"
          icon="bi-github"
          background-color="black"
          text-color="while"
          icon-color="white"
          link="https://github.com/ShookTea/ElectionsSimulator"
      />
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

.right-side {
  margin-right: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1em;
}

.language-picker {
  display: flex;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
}
</style>
