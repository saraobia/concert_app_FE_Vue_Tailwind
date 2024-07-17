<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  concert: {
    type: Object,
    required: true
  }
});

// Funzione per formattare la data
const formatDate = (dateArray) => {
  const [year, month, day] = dateArray;
  return new Date(year, month - 1, day).toLocaleDateString('it-IT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Computed property per i concerti formattati
const formattedConcerts = computed(() => {
  return concerts.value.map(concert => ({
    ...concert,
    formattedDate: formatDate(concert.date)
  }));
});
</script>

<template>
  <div class="bg-light rounded-lg p-4 shadow-xl w-96 h-120 flex  flex-col justify-center px-8">
    <div class="mb-4 text-tMiddle">
      <h1 class="text-xl font-serif text-blue font-semibold mb-2">Concert Details</h1>
      <p><strong>ID:</strong> {{ concert.id }}</p>
      <p><strong>Date:</strong> {{ concert.formattedDate }}</p>
      <p><strong>Band:</strong> {{ concert.band }}</p>
      <p><strong>Available Places:</strong> {{ concert.availablePlace }}</p>
      <p><strong>City:</strong> {{ concert.city }}</p>
      <p><strong>Location:</strong> {{ concert.reply }}</p>
      <p><strong>Time:</strong> 20:00</p>
    </div>

    <div class="text-sm">
      <h3 class="font-serif font-bold text-lg text-blue">Policy</h3>
      <p class="text-tDarkGray">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. In quae dicta quo fugiat nam, perspiciatis incidunt
        aut,
        iste reiciendis consequuntur eius hic labore quisquam
      </p>

    </div>
  </div>
</template>
