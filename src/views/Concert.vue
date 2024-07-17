<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import BookingForm from '../components/BookingForm.vue';
import ConcertService from '@/services/ConcertService';
import ConcertDetailsCard from '../components/ConcertCardDetails.vue';

const route = useRoute();
const concert = ref(null);
const error = ref(null);

const getConcertDetails = async () => {
  try {
    const concertId = route.params.id;
    const data = await ConcertService.getConcert(concertId);
    concert.value = data;
    console.log('Concert details:', concert.value);
  } catch (err) {
    error.value = err;
    console.error('Failed to fetch concert details:', err);
  }
};

onMounted(getConcertDetails);
</script>

<template>
  <div class="flex flex-col items-center justify-center tablet:flex-row">
    <div v-if="concert">
      <ConcertDetailsCard :concert="concert" />
      <BookingForm :concertDetails="concert" />
    </div>
    <div v-else-if="error" class="text-red-500">
      <p>Error: {{ error.message }}</p>
    </div>
    <div v-else class="text-gray-500">
      <p>Loading concert details...</p>
    </div>
  </div>
</template>
