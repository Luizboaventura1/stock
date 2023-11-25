<template>
  <v-btn
    class="bg-blue-darken-2 font-weight-bold text-white elevation-0 rounded"
    @click="$emit('EventButton')"
  >
    <slot />
  </v-btn>
</template>

<script setup></script>

<style lang="scss" scoped></style>
