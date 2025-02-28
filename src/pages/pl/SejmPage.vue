<script lang="ts" setup>
import { ref, watch } from 'vue';
import { Sejm } from '@/models/pl/sejm';

const props = defineProps<{
  year: string;
}>();

const data = ref<Sejm | null>(null);

const loadData = (year: string) => {
  import(`../../data/pl/sejm/${year}.ts`).then((module) => {
    data.value = module.default;
  }).catch((error) => {
    console.error(error);
  });
};

loadData(props.year);

watch(() => props.year, (year) => {
  loadData(year);
});

</script>

<template>
  <div>
    {{ data }}
  </div>
</template>
