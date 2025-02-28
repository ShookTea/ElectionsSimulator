<script lang="ts" setup>
import sejm2023 from '@/data/pl/sejm/2023';

</script>

<template>
  <header>
    Main App
  </header>

  <main>
    {{ sejm2023 }}
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}
</style>
