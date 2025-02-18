<template>
  <div class="w-full bg-white p-4 rounded-lg shadow-md">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';
const chartCanvas = ref(null);
onMounted(() => {
  new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [{ label: 'Revenue', data: [100, 200, 300, 400, 500], backgroundColor: 'green' }],
    },
  });
});
</script>