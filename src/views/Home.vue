<script setup>
import { ref, onMounted } from 'vue';
import UserService from '@/services/UserService';
import ConcertTable from '@/components/ConcertTable.vue'

const user = ref(null);
const error = ref(null);

const saveUserToLocalStorage = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
};

const getUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

onMounted(async () => {
  try {
    const storedUser = getUserFromLocalStorage();
    if (storedUser) {
      user.value = storedUser;
      console.log('User data loaded from localStorage:', user.value);
    }

    // Poi, fai comunque la chiamata al server per ottenere i dati più aggiornati
    const userData = await UserService.getUser();
    user.value = userData;
    console.log('User data fetched from server:', user.value);

    // Salva i dati aggiornati nel localStorage
    saveUserToLocalStorage(userData);
  } catch (err) {
    error.value = err;
    console.error('Failed to fetch user data:', err);
  }
});
</script>

<template>
  <div class="">
    <h1>Welcome to the Homepage</h1>
    <ConcertTable />
  </div>
</template>