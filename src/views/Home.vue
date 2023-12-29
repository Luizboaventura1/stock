<template>
  <v-app class="bg-main">
    <v-container class="mx-auto h-100">
      <nav class="d-flex justify-end">
        <div>
          <PrimaryButton
            v-if="cookie.status"
            @click="$router.push('/dashboard/panel')"
          >
            Ir para o painel
          </PrimaryButton>
        </div>
      </nav>
      <v-main class="d-flex align-center">
        <section>
          <h1 class="font-weight-bolder">
            Gerencie de forma fácil e rápida o seu estoque.
          </h1>
          <p class="my-3">
            Facilite os processos da sua empresa com nosso software completo.
          </p>
          <div class="mt-8">
            <router-link
              :to="cookie.status ? '/dashboard/panel' : '/auth/register'"
            >
              <PrimaryButton class="px-8 "> Começar </PrimaryButton>
            </router-link>
          </div>
        </section>
      </v-main>
    </v-container>
  </v-app>
</template>

<script setup>
import { useTheme } from "vuetify";
import { useCookie } from "@/composables/useCookie";
import PrimaryButton from "@/components/PrimaryButton.vue";

const cookie = useCookie().get("cookie");

const theme = useTheme();

theme.global.name.value = JSON.parse(localStorage.getItem("theme"))
  ? JSON.parse(localStorage.getItem("theme"))
  : "dark";
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");
* {
  font-family: "Inter", sans-serif !important;
}

::-webkit-scrollbar-thumb {
  width: 4px;
  background-color: #2b2b2f;
}

::-webkit-scrollbar {
  width: 4px;
  background-color: #121214;
}

nav {
  height: 60px;
}

main {
  height: calc(100vh - 100px);
}

.bg-main {
  background-image: linear-gradient(to top right, #121214, #1c1c1f) !important;
}

main {
  section {
    width: 100%;
    max-width: 650px;

    h1 {
      font-size: 40px;
      background-image: linear-gradient(to top right, #d6d6d6 30%, #d3d3d3);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p {
      color: #adadad;
    }
  }
}
</style>
