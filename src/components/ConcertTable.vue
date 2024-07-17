<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import ConcertService from '@/services/ConcertService';

const router = useRouter();
const concerts = ref([]);
const error = ref(null);

const getConcertData = async () => {
  try {
    const data = await ConcertService.getConcerts();
    concerts.value = data;
    console.log('Concert data:', concerts.value);
  } catch (err) {
    error.value = err;
    console.error('Failed to fetch concert data:', err);
  }
};

onMounted(getConcertData);

const selectConcert = (concertId) => {
  console.log('Selected concert:', concertId);
  router.push({ name: 'Concert', params: { id: concertId } });
};

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
  <div>
    <div class="flex justify-center mx-2">
      <table class="bg-white rounded-xl shadow-xl w-full tablet:w-200 overflow-hidden ">
        <thead class="bg-blue text-light text-sm font-serif">
          <tr class="text-left">
            <th class="p-4">Band</th>
            <th class="p-4">Places</th>
            <th class="p-4">Location</th>
            <th class="p-4">Date</th>
            <th class="p-4 hidden tablet:table-cell">Venue</th>
            <th class="p-4 hidden tablet:table-cell">Price</th>
          </tr>
        </thead>
        <tbody class="text-darkGray bg-light text-sm bigSmartphone:text-base">
          <tr v-for="concert in formattedConcerts" :key="concert.id" @click="selectConcert(concert.id)"
            class="hover:cursor-pointer hover:scale-[1.02] transition-transform duration-300 ease-in-out hover:shadow-xl hover:bg-card ">
            <td
              class="text-xs p-4 border-ultraLighterGray bigSmartphone:text-sm group-hover:p-5 first:rounded-l-xl group-hover:first:rounded-l-xl overflow-visible group-hover:overflow-visible">
              {{ concert.band }}
            </td>
            <td
              class="text-xs p-4 border-ultraLighterGray bigSmartphone:text-sm group-hover:p-5 overflow-visible group-hover:overflow-visible">
              {{ concert.availablePlace }}
            </td>
            <td
              class="text-xs p-4 border-ultraLighterGray bigSmartphone:text-sm group-hover:p-5 overflow-visible group-hover:overflow-visible">
              {{ concert.city }}
            </td>
            <td
              class="text-xs p-4 border-ultraLighterGray bigSmartphone:text-sm group-hover:p-5 overflow-visible group-hover:overflow-visible">
              {{ concert.formattedDate }}
            </td>
            <td
              class="text-xs p-4 border-ultraLighterGray bigSmartphone:text-sm hidden tablet:table-cell group-hover:p-5 overflow-visible group-hover:overflow-visible">
              {{ concert.reply }}
            </td>
            <td
              class="text-xs p-4 border-ultraLighterGray bigSmartphone:text-sm hidden tablet:table-cell group-hover:p-5 last:rounded-r-xl group-hover:last:rounded-r-xl overflow-visible group-hover:overflow-visible">
              ${{ concert.price }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="error">
      <p>Error: {{ error.message }}</p>
    </div>
  </div>
</template>
