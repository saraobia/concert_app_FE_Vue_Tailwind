<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const isDropdownOpen = ref(false);


const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};


const exitAndRemoveData = async () => {

  // REMOVE LOCAL STORAGE DETAIL
  // ['accessToken', 'idClient', 'idCart', 'name', 'surname', 'email', 'cartCount'].forEach(item => {
  //   localStorage.removeItem(item);
  // });

  router.push({ name: 'login' });
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
      class="fixed bg-white w-full flex py-4 px-4 justify-between items-center text-black z-10 rounded-b-2xl shadow-2xl ">
      <ul class="flex justify-center items-center mt-1">
        <li class="font-black text-black">
          <RouterLink name="home" to="/home">
            Logo
          </RouterLink>
        </li>
      </ul>

      <ul class="flex justify-center items-center">


        <!-- USER -->
        <li class="p-2 relative">
          <button @click="toggleDropdown" class="dropdown-button flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#07575b" class="h-6 w-6">
              <path fill-rule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clip-rule="evenodd" />
            </svg>
          </button>
          <!-- DROPDOWN-MENU -->
          <ul :class="{ 'block': isDropdownOpen, 'hidden': !isDropdownOpen }"
            class="absolute px-2 z-50 -left-36 mt-8 w-48 h-48 bg-white shadow-lg rounded-lg flex flex-col justify-center  group-hover:block text-sm text-darkGray ">
            <li class="p-2 ">Welcome: <span class="font-bold ">{{ }}</span></li>

            <li class="p-2 cursor-pointer hover:bg-hoverLight hover:rounded-md hover:shadow-md">
              <RouterLink name="prenotations" to="/prenotations">My Prenotation</RouterLink>
            </li>

            <li class="p-2 cursor-pointer hover:bg-hoverLight hover:rounded-md hover:shadow-md">
              <RouterLink name="home" to="/home">Back to home</RouterLink>
            </li>

            <li class="p-2 cursor-pointer  hover:bg-hoverLight hover:rounded-md hover:shadow-md">
              <button @click="exitAndRemoveData">Exit</button>
            </li>
          </ul>
        </li>

      </ul>
    </nav>
  </header>

  <!-- Confirm Logout Popup -->
  <div v-if="isConfirmLogoutOpen"
    class="fixed inset-0 flex items-center justify-center z-50 bg-background bg-opacity-85">
    <div class="bg-card w-112  p-6 rounded-lg shadow-lg">
      <p class="text-black text-sm mb-8"><span class="font-bold text-tDarkGray">If you log out, your cart will be
          deleted. <br></span>
        Do you really want
        to log out?
      </p>
      <div class="flex justify-end font-bold text-sm">
        <button @click="cancelLogout" class="bg-primary text-black px-4 py-2 rounded-full mr-2">Continue</button>
        <button @click="exitAndRemoveData" class="bg-danger text-black px-4 py-2 rounded-full">Logout</button>
      </div>
    </div>
  </div>
</template>
