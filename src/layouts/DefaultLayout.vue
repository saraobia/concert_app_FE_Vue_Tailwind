<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
</script>

<template>
  <div>
    <Header />
    <main class="min-h-full flex items-center justify-center bg-gradient-to-b from-lightBlue to-darkLightBlue">
      <router-view />
    </main>
    <Footer />
  </div>
</template>
