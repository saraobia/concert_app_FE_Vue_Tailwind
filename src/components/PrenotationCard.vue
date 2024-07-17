<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  prenotation: {
    type: Object,
    required: true
  }
});

const formatDate = (dateArray) => {
  const [year, month, day] = dateArray;
  return `${day}-${month}-${year}`;
};
</script>

<template>
  <div class="border rounded-lg p-4 shadow-md mb-4">
    <p><strong>ID:</strong> {{ prenotation.id }}</p>
    <p><strong>Payment Type:</strong> {{ prenotation.paymentType || 'N/A' }}</p>
    <p><strong>Quantity:</strong> {{ prenotation.qta }}</p>
    <p><strong>Total Price:</strong> {{ prenotation.totalPrice }}</p>
    <div v-if="prenotation.ticket">
      <h3>Ticket Details:</h3>
      <p><strong>Available Quantity:</strong> {{ prenotation.ticket.availableQta }}</p>
      <div v-if="prenotation.ticket.concert">
        <h4>Concert Details:</h4>
        <p><strong>Band:</strong> {{ prenotation.ticket.concert.band }}</p>
        <p><strong>City:</strong> {{ prenotation.ticket.concert.city }}</p>
        <p><strong>Date:</strong> {{ formatDate(prenotation.ticket.concert.date) }}</p>
        <p><strong>Price:</strong> {{ prenotation.ticket.concert.price }}</p>
        <p><strong>Location:</strong> {{ prenotation.ticket.concert.reply }}</p>
      </div>
    </div>
  </div>
</template>
