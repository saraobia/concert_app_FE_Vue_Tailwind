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
  <div class=" mx-auto p-4">

    <div v-if="prenotations.length === 0">No prenotations found.</div>
    <div v-else>
      <div class="my-24 flex items-center justify-center">
        <div class="grid grid-cols-1 gap-10 tablet:grid-cols-2 laptop:grid-cols-3">
          <PrenotationCard v-for="prenotation in prenotations" :key="prenotation.id" :prenotation="prenotation" />
        </div>
      </div>
    </div>
  </div>
</template>
