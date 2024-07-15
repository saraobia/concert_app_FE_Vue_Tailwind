<script setup>
// LOGIN.VUE
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useAuth } from '@/composable/useAuth';

const { login } = useAuth();

const router = useRouter();
const email = ref('');
const password = ref('');

const handleLogin = async () => {
  console.log('Attempting login with:', { email: email.value, password: password.value });
  try {
    const userData = await login({
      email: email.value,
      password: password.value
    });
    console.log('Login successful:', userData);
    console.log(userData.access_token);

    if (userData && userData.access_token) {
      router.push('/');
    } else {
      console.error('Login successful but no access token received');
      // Gestisci questo caso, magari mostrando un messaggio all'utente
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.error('Login failed: Bad Request. Please check your credentials and try again.');
    } else {
      console.error('Login failed:', error);
    }
  }
};
</script>

<template>
  <form @submit.prevent="handleLogin">
    <input v-model="email" type="text" placeholder="Email" required>
    <input v-model="password" type="password" placeholder="Password" required>
    <button type="submit">Login</button>
  </form>
</template>
