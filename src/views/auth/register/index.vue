<template>
  <v-app :theme="currentTheme" class="d-flex justify-center h-100 bg-primary">
    <v-container class="h-100 d-flex justify-center align-center">
      <form class="pa-5 rounded-lg">
        <h1 class="text-textPrimary font-weight-medium mb-3">Criar conta</h1>
        <input
          class="w-100 pa-3 text-textPrimary bg-primary rounded mb-3"
          placeholder="Seu email"
          type="email"
          v-model="email"
        />
        <input
          class="w-100 pa-3 text-textPrimary bg-primary rounded mb-4"
          placeholder="Sua senha"
          type="password"
          v-model="password"
        />
        <PrimaryButton class="w-100" @click.prevent="register">Registrar</PrimaryButton>

        <p class="text-center mt-3">
          <router-link
            to="/auth/login"
            class="text-textPrimary text-decoration-none text-subtitle-2"
            >Tem conta? Fazer login</router-link
          >
        </p>
      </form>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { addDoc, collection, query, getDocs, where } from "firebase/firestore";
import { db } from "@/plugins/firebase";
import { useRouter } from "vue-router";
import PrimaryButton from "@/components/PrimaryButton.vue";

let router = useRouter();

let email = ref("");
let password = ref("");

const register = async () => {
  if (
    validateForm(email.value, password.value) &&
    (await checkInFirestore(email.value))
  ) {
    try {
      addDoc(collection(db, "user"), {
        email: email.value,
        password: password.value,
        stock: {
          input: [],
          output: [],
        },
      })

      router.push("/dashboard/panel");
    } catch (error) {
      alert("Erro ao adicionar usuário: " + error.message);
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
    alert("Conta existente!");
    return false; // Conta já existe
  }

  return true; // Conta não existe
};

const currentTheme = JSON.parse(localStorage.getItem("theme"))
  ? JSON.parse(localStorage.getItem("theme"))
  : "dark";
</script>

<style lang="scss" scoped>
$background-form: rgb(42, 41, 43);

form {
  width: 100%;
  max-width: 300px;
  background-color: $background-form;

  input:focus {
    outline: 2px solid rgb(98, 100, 102);
  }

  h1 {
    font-size: 17px;
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
