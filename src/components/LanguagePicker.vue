<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { watch } from 'vue';
const { locale } = useI18n();
watch(locale, (locale) => {
  document.documentElement.lang = locale;
  localStorage.setItem('locale', locale);
});
</script>
<template>
  <select v-model="$i18n.locale">
    <option
        v-for="locale in $i18n.availableLocales"
        :key="`locale-${locale}`"
        :value="locale"
    >
      {{ $t(`app.language.${locale}`) }}
    </option>
  </select>
</template>
