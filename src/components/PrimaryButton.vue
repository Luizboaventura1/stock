<template>
  <button
    class="primary-button font-weight-medium text-white rounded px-4 py-2 text-md"
  >
    <slot />
  </button>
</template>

<script setup></script>

<style lang="scss" scoped>
.primary-button {
  border: 1px solid #4d4d4d;
  background-color: #1f1f22;
  transition: 0.3s;
  font-size: 14px;
  &:hover {
    border: 1px solid #525252;
    background-color: #2a2a2e;
  }
}
</style>
