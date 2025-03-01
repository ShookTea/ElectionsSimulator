<template>
  <span class="two-column-form-label">
    <slot />
  </span>
</template>

<style>
.two-column-form-label {
  font-size: 0.8rem;
  color: #666;
  grid-column: span 2;
  display: block;
}
</style>
