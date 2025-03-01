<script lang="ts" setup></script>
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
