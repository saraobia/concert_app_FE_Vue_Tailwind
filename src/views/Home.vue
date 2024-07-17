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
  <div class="flex my-24 flex-col items-center justify-center">
    <div class="flex flex-col items-center w-80 py-20">
      <h1 class="font-serif text-blue font-bold text-5xl text-center mb-2">Welcome to our Store</h1>
      <p class="text-tMiddle font-medium text-sm text-center mb-4">Lorem ipsum dolor sit amet consectetur adipisicing
        elit.
        Beatae soluta
        quibusdam expedita
        natus illum
        .</p>
      <div class="flex font-serif">
        <!-- Primo pulsante -->
        <div class="flex items-center justify-end p-2">
          <div
            class="bg-card shadow-xl w-36 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
            <a href="https://github.com/saraobia?tab=repositories" target="_blank" class="text-blue font-bold py-3">
              Discover
            </a>
          </div>
        </div>
        <!-- Secondo pulsante -->
        <div class="flex items-center justify-end p-2">
          <div
            class="bg-blue shadow-xl w-36 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
            <a href="https://github.com/saraobia?tab=repositories" target="_blank" class="text-card font-bold py-3">
              Try now
            </a>
          </div>
        </div>
      </div>
    </div>
    <ConcertTable />
  </div>
</template>