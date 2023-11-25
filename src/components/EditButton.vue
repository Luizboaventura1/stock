<template>
  <button
    :style="`width: ${props.size}px;height: ${props.size}px`"
    @click="$emit('EventButton')"
    class="rounded pa-2 d-flex justify-center align-center"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      style="enable-background: new 0 0 512 512"
      xml:space="preserve"
    >
      <g>
        <path
          d="M508.5 65.681A65.681 65.681 0 0 0 396.338 19.2L88.318 327.215a16.008 16.008 0 0 0-4.189 7.356L58.55 434.757a16 16 0 0 0 20.256 19.236l95.923-29.843a16.013 16.013 0 0 0 6.56-3.964l308.02-308.019A65.281 65.281 0 0 0 508.5 65.681zM161.453 394.767l-64.814 20.165 17.41-68.193L383.6 77.187l47.718 47.713zM466.682 89.54l-12.737 12.736-47.716-47.717 12.736-12.736a33.741 33.741 0 0 1 47.717 47.717zM349.377 512H19.5a16 16 0 1 1 0-32h329.877a16 16 0 0 1 0 32z"
          opacity="1"
          data-original="#000000"
          class=""
        ></path>
      </g>
    </svg>
  </button>
</template>

<script setup>
import { defineProps } from "vue";
let props = defineProps({
  size: String,
});
</script>

<style scoped lang="scss">
button {
  &:hover {
    background-color: #3b3b3f;
  }

  svg {
    fill: rgb(241, 241, 241);
    width: 100%;
    height: 100%;
  }
}
</style>
