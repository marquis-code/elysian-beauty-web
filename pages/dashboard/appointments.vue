<template>
   <main>
    <HomeCalendar />
    <!-- <DashboardScheduleAppointmentsCalendar /> -->
   </main>
</template>

<script setup lang="ts">
import { useFetchAppointments } from '@/composables/modules/appointment/useFetchAppointments'

const { fetchAppointments, appointments, loading } = useFetchAppointments()
definePageMeta({
    layout: 'dashboard'
})
</script>