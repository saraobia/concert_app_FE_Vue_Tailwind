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
  <div class="px-4">
    <div
      class="w-96 h-auto mx-auto bg-light p-8 rounded-lg shadow-lg bigSmartphone:w-96 laptop:w-104 flex flex-col items-center justify-center text-tMiddle">
      <div class="w-full">
        <h1 class=" text-2xl font-serif font-bold text-blue mb-6">Booking Details</h1>
      </div>
      <div class="w-full mb-6">
        <p><strong>ID:</strong> {{ prenotation.id }}</p>
        <p><strong>Payment Type:</strong> {{ prenotation.paymentType || 'N/A' }}</p>
        <p><strong>Quantity:</strong> {{ prenotation.qta }}</p>
        <p><strong>Total Price:</strong> ${{ prenotation.totalPrice }}</p>
        <div v-if="prenotation.ticket">
          <h3 class="text-lg font-bold mt-4">Ticket Details:</h3>
          <p><strong>Available Quantity:</strong> {{ prenotation.ticket.availableQta }}</p>
          <div v-if="prenotation.ticket.concert">
            <h4 class="text-lg font-bold mt-4">Concert Details:</h4>
            <p><strong>Band:</strong> {{ prenotation.ticket.concert.band }}</p>
            <p><strong>City:</strong> {{ prenotation.ticket.concert.city }}</p>
            <p><strong>Date:</strong> {{ formatDate(prenotation.ticket.concert.date) }}</p>
            <p><strong>Price:</strong> ${{ prenotation.ticket.concert.price }}</p>
            <p><strong>Location:</strong> {{ prenotation.ticket.concert.city }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
