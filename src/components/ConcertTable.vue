<script setup>
import { ref, onMounted } from 'vue';
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
</script>

<template>
  <div>
    <div class="flex justify-center mx-2">
      <table class="overflow-hidden bg-white rounded-xl shadow-xl">
        <thead class="bg-darkLightBlue text-white text-sm">
          <tr class="text-left">
            <th class="border-r p-4">Code</th>
            <th class="border-r p-4">Date</th>
            <th class="border-r p-4">Time</th>
            <th class="p-4">Places</th>
            <th class="p-4">Location</th>
            <th class="p-4">Reply</th>
            <th class="p-4">Hour</th>
          </tr>
        </thead>
        <tbody class="text-darkGray text-sm bigSmartphone:text-base">
          <tr v-for="concert in concerts" :key="concert.id" @click="selectConcert(concert.id)"
            class="hover:cursor-pointer hover:bg-hoverLight hover:rounded-lg hover:shadow-md hover:border-white">
            <td class="font-semibold p-4 border-b border-r border-ultraLighterGray">
              {{ concert.id }}
            </td>
            <td class="text-xs p-4 border-b border-r border-ultraLighterGray bigSmartphone:text-sm">
              {{ concert.date }}
            </td>
            <td class="text-xs p-4 border-b border-r border-ultraLighterGray bigSmartphone:text-sm">
              {{ concert.band }}
            </td>
            <td class="text-xs p-4 border-b border-ultraLighterGray bigSmartphone:text-sm">
              {{ concert.availablePlace }}
            </td>
            <td class="text-xs p-4 border-b border-ultraLighterGray bigSmartphone:text-sm">
              {{ concert.city }}
            </td>
            <td class="text-xs p-4 border-b border-ultraLighterGray bigSmartphone:text-sm">
              {{ concert.reply }}
            </td>
            <td class="text-xs p-4 border-b border-ultraLighterGray bigSmartphone:text-sm">
              20:00
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