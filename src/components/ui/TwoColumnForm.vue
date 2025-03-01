<template>
  <div class="two-column-form">
    <slot />
  </div>
</template>

<style>
.two-column-form {
  display: grid;
  grid-template-columns: auto auto;
  row-gap: 0.5rem;
  align-items: center;
}
</style>
