<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const backToHome = () => {
  router.push('/');
}

</script>

<template>
  <div class="h-screen  flex flex-col items-center justify-center">
    <h1 class="z-10 text-8xl font-serif font-bold text-blue mb-6">404</h1>
    <div class="h-auto absolute">
    </div>
    <div class=" z-10 flex items-center text-sm font-bold">
      <h3 class="text-tMiddle ">Content not found, but you can</h3>
      <button @click="backToHome" class="mx-2  text-light rounded-md hover:text-blue">Back to
        home</button>
    </div>
  </div>
</template>