<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  concert: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="border rounded-lg p-4 shadow-md mb-4">
    <h1 class="text-xl font-semibold mb-2">Concert Details</h1>
    <p><strong>ID:</strong> {{ concert.id }}</p>
    <p><strong>Date:</strong> {{ concert.date }}</p>
    <p><strong>Band:</strong> {{ concert.band }}</p>
    <p><strong>Available Places:</strong> {{ concert.availablePlace }}</p>
    <p><strong>City:</strong> {{ concert.city }}</p>
    <p><strong>Location:</strong> {{ concert.reply }}</p>
    <p><strong>Time:</strong> 20:00</p>
  </div>
</template>
