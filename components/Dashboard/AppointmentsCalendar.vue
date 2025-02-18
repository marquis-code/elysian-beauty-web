<template>
  <div class="w-full bg-white p-4 rounded-lg shadow-md">
    <vue-cal
      :events="events"
      :time-from="8 * 60"
      :time-to="18 * 60"
      :disable-views="['years', 'year', 'month']"
      active-view="week"
    />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
const events = ref([
  { start: '2025-02-16 09:00', end: '2025-02-16 10:00', title: 'Gele Tying', class: 'bg-green-500' },
  { start: '2025-02-16 10:00', end: '2025-02-16 11:00', title: 'Makeup', class: 'bg-yellow-500' },
  { start: '2025-02-16 11:00', end: '2025-02-16 12:00', title: 'Deep Tissue Massage', class: 'bg-red-500' },
]);
</script>
