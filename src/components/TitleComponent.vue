<template>
  <h1 :class="`${font}`" class="font-weight-medium text-textPrimary">
    <slot />
  </h1>
</template>

<script setup>
import { defineProps, computed } from "vue";

let props = defineProps({
  sm: {
    type: Boolean,
    default: false,
  },
  md: {
    type: Boolean,
    default: false,
  },
  lg: {
    type: Boolean,
    default: false,
  },
  xl: {
    type: Boolean,
    default: false,
  },
});

const font = computed(() => {
  if (props.sm) return "text-h6";
  else if (props.md) return "text-h5";
  else if (props.lg) return "text-h3";
  else if (props.xl) return "text-h2";
});
</script>

<style lang="scss" scoped></style>
