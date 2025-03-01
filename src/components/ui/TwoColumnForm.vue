<template>
  <div class="two-column-form">
    <slot />
  </div>
</template>

<style>
.two-column-form {
  display: grid;
  grid-template-columns: 50% 50%;
  row-gap: 0.5rem;
  align-items: center;
}
</style>
