<template>
  <Transition>
    <div
      @click="$emit('closeModal')"
      v-if="props.modal"
      class="background h-100 w-100 d-flex justify-center align-center"
    >
      <div @click.stop class="modal bg-primary pa-4 rounded">
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { defineProps } from "vue";

let props = defineProps({
  modal: Boolean,
});
</script>

<style lang="scss" scoped>
.background {
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.592);
}

.modal {
  width: 100%;
  max-width: 350px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
