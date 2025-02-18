<template>
  <aside class="w-64 bg-gray-900 text-white h-screen p-5">
    <h1 class="text-xl font-bold mb-5">Elysian Beauty</h1>
    <ul>
      <li v-for="item in menuItems" :key="item.name" class="mb-2">
        <NuxtLink :to="item.path" class="flex items-center p-2 rounded-lg hover:bg-gray-700">
          <span>{{ item.name }}</span>
        </NuxtLink>
      </li>
    </ul>
  </aside>
</template>
<script setup>
const menuItems = [
  { name: 'Overview', path: '/' },
  { name: 'Appointment', path: '/appointment' },
  { name: 'Recent Bookings', path: '/bookings' },
  { name: 'Messages', path: '/messages' },
  { name: 'Settings', path: '/settings' },
];
</script>
