<template>
  <router-link />
  <v-app class="d-flex justify-center bg-primary h-100">
    <v-container class="d-flex justify-center align-center h-100">
      <main class="text-center">
        <h1 class="text-h1 font-weight-bold text-pink-accent-3">Stock</h1>
        <p class="text-grey-darken-1 my-3">
          Sistema de fácil e rápido gerenciamento de controle de estoque.
        </p>
        <router-link to="/auth/register">
          Começar
        </router-link>
      </main>
    </v-container>
  </v-app>
</template>

<script setup></script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Inter", sans-serif !important;
}

html,
body {
  height: 100%;
}
</style>
