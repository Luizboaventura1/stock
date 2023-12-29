<template>
  <div class="card rounded pa-5">
    <slot />
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 150px;
  background-image: linear-gradient(to top right, #121214, #1c1c1e);
}
</style>