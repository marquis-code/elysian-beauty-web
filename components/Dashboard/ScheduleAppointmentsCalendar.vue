<template>
  <div class="w-full bg-white p-4 rounded-lg shadow-md">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'timeGridWeek',
  editable: true,
  selectable: true,
  background: true,
  events: [
    { title: 'Gele Tying', start: '2025-02-16T09:00:00', end: '2025-03-16T12:00:00' },
    { title: 'Makeup', start: '2025-02-16T10:00:00', end: '2025-02-16T11:00:00' },
    { title: 'Testing', start: '2025-02-16T10:00:00', end: '2025-02-16T11:00:00' },
    { title: 'Deep Tissue Massage', start: '2025-02-16T11:00:00', end: '2025-02-16T12:00:00' },
  ],
});
</script>
