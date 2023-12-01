<template>
  <v-app :theme="currentTheme" class="d-flex justify-center h-100 bg-primary">
    <v-container class="h-100 d-flex justify-center align-center">
      <form class="pa-5 rounded-lg bg-third">
        <h1 class="text-textPrimary">Criar conta</h1>
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
          @click="register"
          >Cadastrar</v-btn
        >
        <p class="text-center mt-3">
          <router-link to="/auth/login" class="text-textPrimary text-decoration-none text-subtitle-2">Tem conta? Fazer login</router-link>
        </p>
      </form>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { addDoc, collection, query, getDocs, where } from "firebase/firestore";
import { db } from "@/plugins/firebase";
import { useCookie } from "@/composables/useCookie"
import { useRouter } from "vue-router";

let router = useRouter()

let email = ref("");
let password = ref("");

const register = async () => {
  if (validateForm(email.value, password.value) && (await checkInFirestore(email.value))) {
    try {
      await addDoc(collection(db, "user"), {
        email: email.value,
        password: password.value,
        stock: {
          input: [],
          output: [],
        },
      });

      useCookie().set('cookie', {
        status: true,
        email: email.value,
        password: password.value
      })

      let statusCookie = setInterval(() => {
        if (useCookie().get('cookie').status) {
          clearInterval(statusCookie)
          return router.push('/panel')
        }
      }, 400)
    
    } catch (error) {
      alert('Erro ao adicionar usuário: ' + error.message);
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

const checkInFirestore = async (email) => {
  const q = query(collection(db, "user"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    alert('Conta existente!');
    return false; // Conta já existe
  }

  return true; // Conta não existe
};

const currentTheme = JSON.parse(localStorage.getItem("theme"))
  ? JSON.parse(localStorage.getItem("theme"))
  : "dark";

</script>

<style lang="scss" scoped>
$background-form: rgb(37, 35, 39);

form {
  width: 100%;
  max-width: 300px;
  background-color: $background-form;

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
