<template>
  <v-app class="d-flex justify-center h-100 bg-primary">
    <v-container class="h-100 d-flex align-center">
      <v-main class="px-4 text-center">
        <h1 class="font-weight-bold text-textPrimary text-h3">Stock</h1>
        <p class="my-7 text-textPrimary">
          Gerencie de forma fácil e rápida seu estoque.
        </p>
        <router-link
          class="text-decoration-none font-weight-bold text-white bg-blue-darken-3 py-3 px-12 rounded-xl"
          to="/auth/register"
        >
          Começar
        </router-link>
      </v-main>
    </v-container>
  </v-app>
</template>

<style lang="scss">
::-webkit-scrollbar-thumb {
  width: 10px;
  background-color: #2b2b2f;
}

::-webkit-scrollbar {
  width: 10px;
  background-color: #121214;
}
</style>

<script setup>
import { useTheme } from "vuetify";

const theme = useTheme();

theme.global.name.value = JSON.parse(localStorage.getItem("theme"))
  ? JSON.parse(localStorage.getItem("theme"))
  : "dark";
</script>
