<script setup>
// LOGIN.VUE
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useAuth } from '@/composable/useAuth';

const { login } = useAuth();

const router = useRouter();
const email = ref('');
const password = ref('');

const errorMessage = ref('');

const handleLogin = async () => {
  console.log('Attempting login with:', { email: email.value, password: password.value });
  try {
    const userData = await login({
      email: email.value,
      password: password.value
    });
    // console.log('Login successful:', userData);
    // console.log(userData.access_token);

    if (userData && userData.access_token) {
      router.push('/');
    } else {
      // console.error('Login successful but no access token received');
      // Gestisci questo caso, magari mostrando un messaggio all'utente
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      errorMessage.value = 'Invalid email or password. Please try again.';
    } else if (error.response && error.response.status === 400) {
      errorMessage.value = 'Error credentials, please try again.';
    } else {
      errorMessage.value = 'An error occurred during login. Please try again later.';
    }
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <form @submit.prevent="handleLogin">
      <!-- ICON -->
      <div class="flex items-center justify-center">
        <div
          class="bg-blue shadow-xl mb-4 flex items-center bg-hoverLight justify-center h-24 w-24 rounded-full shadow-inner-strong">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e0f2fe" class="h-10 w-10 ">
            <path fill-rule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clip-rule="evenodd" />
          </svg>
        </div>
      </div>

      <!-- EMAIL -->
      <div class="p-2">
        <input class="bg-card text-tDarkGray text-sm font-medium p-4 w-72 rounded-full shadow-xl focus:outline-none"
          v-model="email" type="text" placeholder="Email" required>
      </div>

      <!-- PASSWORD -->
      <div class="p-2 mb-4">
        <input class=" bg-card text-tDarkGray text-sm font-medium p-4 w-72 rounded-full shadow-xl focus:outline-none"
          v-model="password" type="password" placeholder="Password" required>
      </div>

      <!-- ERROR MESSAGE -->
      <div class="flex items-center justify-center">
        <div v-if="errorMessage" class="w-72 text-center text-darkDanger font-bold  mb-4">
          {{ errorMessage }}
        </div>
      </div>

      <!-- BTN -->
      <div class="flex items-center justify-end p-2">
        <div
          class="bg-blue shadow-xl w-36 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
          <button class=" text-card font-bold py-3 " type="submit">Login</button>
        </div>
      </div>
    </form>
  </div>
</template>
