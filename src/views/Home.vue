<script setup>
import { ref, onMounted } from 'vue';

import UserService from '@/services/UserService';


const user = ref(null);
const error = ref(null);

onMounted(async () => {
  try {
    const userData = await UserService.getUser(); // Usa UserService per ottenere i dati dell'utente
    user.value = userData;
    console.log('User data:', user.value);
  } catch (err) {
    error.value = err; // Gestisci l'errore
    console.error('Failed to fetch user data:', err);
  }
});


</script>

<template>
  <div class="home">
    <h1>Welcome to the Homepage</h1>
    <div v-if="user">
      <p>Username: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
    </div>
    <div v-else>
      <p>Loading user details...</p>
    </div>
    <div v-if="error">
      <p>Error: {{ error.message }}</p>
      <!-- Gestisci errori di accesso non autorizzato o altri errori -->
    </div>
  </div>
</template>