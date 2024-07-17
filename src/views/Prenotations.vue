<script setup>
import { ref, onMounted } from 'vue';
import PrenotationService from '@/services/PrenotationService';
import PrenotationCard from '../components/PrenotationCard.vue'

const user = JSON.parse(localStorage.getItem('user'));
const idUser = user.id;
const prenotations = ref([]);

const getPrenotationsDetail = async () => {
  try {
    const data = await PrenotationService.getPrenotations(idUser);
    prenotations.value = data;
    console.log('prenotations details:', prenotations.value);
  } catch (err) {
    console.error('Failed to fetch prenotations details:', err);
  }
};

onMounted(getPrenotationsDetail);
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">myPren</h1>
    <div v-if="prenotations.length === 0">No prenotations found.</div>
    <div v-else>
      <PrenotationCard v-for="prenotation in prenotations" :key="prenotation.id" :prenotation="prenotation" />
    </div>
  </div>
</template>
