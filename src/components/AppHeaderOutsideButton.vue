<script lang="ts" setup>
const props = defineProps<{
  label: string;
  icon: string;
  backgroundColor: string;
  textColor: string;
  iconColor: string;
  link: string;
}>();

const openLink = () => {
  window.location.href = props.link;
};
</script>

<template>
  <div class="button" @click="openLink" :style="{ backgroundColor }">
    <v-icon class="icon" :name="icon" :color="iconColor"/>
    <span :style="{ color: textColor }">{{ label }}</span>
  </div>
</template>

<style scoped>
.button {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 1em;
  gap: 0.2em;
  border-radius: 0.5em;
}
</style>
