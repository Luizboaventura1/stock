<template>
  <v-app class="d-flex justify-center h-100 bg-primary">
    <v-container class="h-100 d-flex justify-center align-center">
      <form class="pa-5 rounded-lg bg-third">
        <h1>Fazer login</h1>
        <input
          class="w-100 py-3 px-3 text-textPrimary bg-primary my-3 rounded"
          placeholder="Seu email"
          type="email"
          v-model="email"
        />
        <input
          class="w-100 py-3 px-3 text-textPrimary bg-primary my-3 rounded"
          placeholder="Sua senha"
          type="password"
          v-model="password"
        />
        <v-btn
          class="w-100 rounded font-weight-medium bg-blue-darken-1 mt-2"
          @click="login"
          >Login</v-btn
        >
        <p class="text-center mt-3">
          <router-link
            to="/auth/register"
            class="text-textPrimary text-decoration-none text-subtitle-2"
            >Não tem conta? Fazer cadastro</router-link
          >
        </p>
      </form>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "@/plugins/firebase";
import { useCookie } from "@/composables/useCookie";
import { useRouter } from "vue-router";

let email = ref("");
let password = ref("");

const login = async () => {
  if (
    validateForm(email.value, password.value) &&
    (await checkInFirestore(email.value, password.value))
  ) {
    try {
      useCookie().set("cookie", {
        status: true,
        email: email.value,
        password: password.value,
      });

      useRouter().push('/panel')
    } catch (error) {
      alert("Erro ao fazer login: " + error.message);
    }
  } else {
    alert("Insira os dados corretamente");
  }
};

const validateForm = (email, password) => {
  let validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let validatePassword = /^.{8,}$/;

  return validateEmail.test(email) && validatePassword.test(password);
};

const checkInFirestore = async (email, password) => {
  const q = query(collection(db, "user"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  let result = false

  querySnapshot.forEach(doc => {
    if (doc.data().email === email && doc.data().password === password) {
      result = true
    }
  })

  return result
};
</script>

<style lang="scss" scoped>

form {
  width: 100%;
  max-width: 300px;

  h1 {
    font-size: 25px;
  }

  input {
    border: none;
    outline: none;
    background-color: #141416;
  }

  p {
    a {
      &:hover {
        text-decoration: underline !important;
      }
    }
  }
}
</style>
