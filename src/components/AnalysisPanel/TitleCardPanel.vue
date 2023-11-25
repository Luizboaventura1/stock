<template>
  <h1 :style="`font-size: ${font};`" class="font-weight-medium text-textPrimary">
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
  if (props.sm) return "12px";
  else if (props.md) return "14px";
  else if (props.lg) return "16px";
  else if (props.xl) return "20px";
});
</script>

<style lang="scss" scoped></style>
