<script setup>
import { ref, defineEmits } from 'vue';
import PrenotationService from '@/services/PrenotationService';
import Decimal from 'decimal.js';

const props = defineProps({
  concertDetails: {
    type: Object,
    required: true
  }
});

const emits = defineEmits(['update:bookingConfirmed']);
const user = JSON.parse(localStorage.getItem('user'));


const idUser = user.id;
const passengers = ref(1);
const payment = ref('');


const handleSubmitBookConcert = async () => {
  try {
    const concertId = props.concertDetails.id;
    const qta = passengers.value;
    const paymentType = payment.value;

    const requestData = { paymentType };
    console.log('Sending request:', requestData);

    const data = await PrenotationService.createAndConfirmPrenotation(idUser, concertId, qta, paymentType);
    console.log('Booking completed:', data);

    emits('update:bookingConfirmed', true); // Emit event to notify parent component

  } catch (err) {
    console.error('Failed to fetch concert details:', err);
  }
};


// FUNCTION TO CALCULATE THE TOTAL PRICE
const calculateTotalPrice = () => {
  if (props.concertDetails) {
    const concertPrice = new Decimal(props.concertDetails.price);
    const totalPrice = concertPrice.times(passengers.value);
    return totalPrice.toFixed(2); // Imposta due decimali per la visualizzazione
  } else {
    return '0.00'; // Ritorna una stringa '0.00' se props.concertDetails non è definito o è null
  }
};

// COUNTER FUNCTION TO ADD AND REMOVE PASSENGERS
const handleAddPassenger = () => {
  if (passengers.value < props.concertDetails.availablePlace) {
    passengers.value++;
  }
};

const handleRemovePassenger = () => {
  if (passengers.value > 1) {
    passengers.value--;
  }
};

const selectPayment = (type) => {
  payment.value = type;
}



</script>

<template>
  <div class="p-4">
    <div class="w-96 h-112 mx-auto bg-white p-8 rounded-lg shadow-lg bigSmartphone:w-96 laptop:w-112">
      <h1 class="text-2xl font-medium text-dark text-center mb-4">Booking <span
          class="font-bold text-middle">Details</span></h1>
      <!-- FORM -->
      <form @submit.prevent="handleSubmitBookConcert">

        <!-- NUMB OF PASSENGERS -->
        <div class="mb-6 flex flex-col ">
          <label for="passengers" class=" text-lightGray font-semibold text-sm mb-4">Passengers:</label>
          <div class=" flex items-center ">
            <input type="number" id="passengers" v-model="passengers" min="1"
              class="w-14 text-center bg-white text-darkGray text-xl font-extrabold active:outline-none focus:outline-none  "
              required :readonly="true" />

            <!-- MINUS -->
            <div class="cursor-pointer" @click="handleRemovePassenger">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="#bde7fe" class="size-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>

            </div>
            <!-- PLUS -->
            <div @click="handleAddPassenger" class="h-8 w-8 p-2 bg-darkLightBlue rounded-full cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="white"
                class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>

          </div>
        </div>

        <!-- TYPE OF PAYMENT -->
        <div class="mb-8 text-sm">
          <label for="payment" class=" text-lightGray font-semibold">Select the type of payment:</label>

          <div class="grid grid-cols-2 gap-2 mt-2 text-darkGray">

            <!-- CREDIT CARD -->
            <div @click="selectPayment('CREDIT_CARD')"
              :class="{ 'bg-darkLightBlue shadow-lg text-white': payment === 'CREDIT_CARD', 'shadow-xl': payment !== 'CREDIT_CARD' }"
              class="p-4 flex items-center justify-center rounded-lg cursor-pointer focus:outline-none hover:bg-darkLightBlue hover:text-white">
              <font-awesome-icon :icon="['fas', 'credit-card']" class="text-xl text-icon-gray" />
              <span class="ml-2">Credit card</span>
            </div>

            <!-- PAYPAL -->
            <div @click="selectPayment('PAYPAL')"
              :class="{ 'bg-darkLightBlue shadow-lg text-white': payment === 'PAYPAL', 'shadow-xl': payment !== 'PAYPAL' }"
              class="p-4 flex items-center justify-center cursor-pointer  rounded-lg focus:outline-none hover:bg-darkLightBlue hover:text-white">
              <font-awesome-icon :icon="['fab', 'paypal']" class="text-xl text-icon-gray" />
              <span class="ml-2">PayPal</span>
            </div>


            <!-- GOOGLE PAY -->
            <div @click="selectPayment('GOOGLE_PAY')"
              :class="{ 'bg-darkLightBlue shadow-lg text-white': payment === 'GOOGLE_PAY', 'shadow-xl': payment !== 'GOOGLE_PAY' }"
              class="p-4 flex items-center justify-center cursor-pointer rounded-lg focus:outline-none hover:bg-darkLightBlue hover:text-white">
              <font-awesome-icon :icon="['fab', 'google-pay']" class="text-xl text-icon-gray " />
              <span class="ml-2 items-center">Google pay</span>
            </div>

            <!-- BANK TRANSFER -->
            <div @click="selectPayment('BANK_TRANSFER')"
              :class="{ 'bg-darkLightBlue shadow-lg text-white': payment === 'BANK_TRANSFER', 'shadow-xl': payment !== 'BANK_TRANSFER' }"
              class="p-4 flex items-center justify-center rounded-lg cursor-pointer focus:outline-none hover:bg-darkLightBlue  hover:text-white">
              <font-awesome-icon :icon="['fas', 'money-bill-transfer']" />
              <span class="ml-2">Bank transfer</span>
            </div>
          </div>

        </div>

        <!-- TOTAL PRICE -->

        <div class=" flex justify-between">
          <div>
            <label for="comments" class=" text-base block font-bold text-dark ">Total Price:</label>

            <div id="totalPrice" class="text-darkGray font-extrabold">{{ calculateTotalPrice() }} $</div>
          </div>

          <button type="submit"
            class="bg-darkLightBlue text-white px-4 py-2 rounded-lg hover:bg-middle shadow-xl focus:outline-none  ">
            Book Tickets
          </button>
        </div>
      </form>
    </div>
  </div>
</template>