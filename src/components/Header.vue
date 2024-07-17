<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composable/useAuth';

const { logout } = useAuth();

const router = useRouter();
const isDropdownOpen = ref(false);
const storedUserString = localStorage.getItem('user');
const storedUser = ref(null);

if (storedUserString) {
  try {
    storedUser.value = JSON.parse(storedUserString);
    console.log(storedUser.value.name);
  } catch (error) {
    console.error('Error parsing user data:', error);
  }
}


const exitAndRemoveData = () => {
  logout();
  router.push('/login');
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};



// CLICK OUTSIDE THE MENU FUNCTIONS
const handleClickOutside = (event) => {
  if (isDropdownOpen.value) {
    const dropdownButton = document.querySelector('.dropdown-button');
    if (dropdownButton && !dropdownButton.contains(event.target)) {
      isDropdownOpen.value = false;
    }
  }
};

// Monta il listener quando il componente è montato
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

// Smonta il listener quando il componente viene distrutto
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

</script>

<template>
  <header>
    <nav
      class="fixed bg-light w-full flex py-4 px-4 justify-between items-center text-black z-10 rounded-b-2xl shadow-xl ">
      <ul class="flex justify-center items-center mt-1">
        <li class="font-black text-blue">
          <RouterLink name="home" to="/">
            Company.co
          </RouterLink>
        </li>
      </ul>

      <ul class="flex justify-center items-center">


        <!-- USER -->
        <li class="p-2 relative">
          <button @click="toggleDropdown" class="dropdown-button flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0083ca" class="h-6 w-6">
              <path fill-rule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clip-rule="evenodd" />
            </svg>
          </button>
          <!-- DROPDOWN-MENU -->
          <ul :class="{ 'block': isDropdownOpen, 'hidden': !isDropdownOpen }"
            class="absolute px-2 z-50 -left-36 mt-8 w-48 py-4 bg-light shadow-lg rounded-lg flex flex-col justify-center group-hover:block text-sm font-medium text-tDarkGray text-darkGray ">
            <li class="p-2 ">Welcome: <span class="text-blue font-serif font-bold ">{{ storedUser.name }}</span>
            </li>

            <li class=" p-2 cursor-pointer hover:text-blue">
              <RouterLink name="prenotations" to="/prenotations">My Prenotation</RouterLink>
            </li>

            <li class="p-2 cursor-pointer hover:text-blue">
              <RouterLink name="home" to="/">Back to home</RouterLink>
            </li>

            <li class="p-2 cursor-pointer  hover:text-blue">
              <button @click="exitAndRemoveData">Exit</button>
            </li>
          </ul>
        </li>

      </ul>
    </nav>
  </header>

</template>
