<template>
  <div class="p-4 max-w-6xl mx-auto lg:p-12">
    <!-- Search and Tabs -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-x-20 space-y-4 lg:space-y-0">
      <!-- Search Bar -->
      <div class="flex-grow relative">
        <input
            type="text"
            v-model="searchQuery"
            placeholder="Search articles..."
            class="w-full border rounded-lg p-3 pl-10 text-sm focus:ring-2 focus:ring-green-700"
        />
        <svg class="absolute left-3 top-3" width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.8187 19.3119L15.1962 15.6894M17.1532 10.9843C17.1532 14.6637 14.1705 17.6464 10.4912 17.6464C6.81181 17.6464 3.8291 14.6637 3.8291 10.9843C3.8291 7.30498 6.81181 4.32227 10.4912 4.32227C14.1705 4.32227 17.1532 7.30498 17.1532 10.9843Z" stroke="#A3A3A3" stroke-width="1.66552" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

      </div>
      <!-- Tabs -->
      <div class="flex space-x-2 overflow-auto">
        <button
            v-for="tab in tabs"
            :key="tab"
            @click="filterBlogs(tab)"
            :class="[
            'px-6 py-2 rounded-full text-sm border',
            selectedTab === tab ? ' text-[#045940] border-[#045940]' : 'bg-white text-[#A3A8A7] border-[#A3A8A7]',
          ]"
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <!-- Blog Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2  gap-6">
      <div
          v-for="blog in filteredBlogs"
          :key="blog.id"
          class="bg-white border-[0.5px] border-[#A3A8A7] rounded-lg shadow-sm p-4"
      >
        <!-- Blog Content -->
        <div>
          <h2 class="text-lg font-medium text-[#141515] mb-2">{{ blog.title }}</h2>
          <p class="text-sm text-gray-500 mb-4 light">
            <span class="text-[#045940]">{{ blog.category }}</span> | <span class="text-[#505554]">{{ blog.date }}</span>
          </p>
          <img :src="blog.image" alt="Blog Image" class="w-full h-72 object-cover rounded-lg mb-4" />
          <p class="text-sm text-[#505554] leading-snug mb-4">
            {{ blog.description }}
          </p>
          <button @click="router.push(`/blogs/${blog.id}`)" class="text-green-700 text-sm px-3 py-2.5 rounded-full border-2 border-[#045940] font-semibold flex items-center">
            Learn More
            <span class="ml-1"><svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.11279 15.6316L16.1839 8.56055M16.1839 8.56055H10.527M16.1839 8.56055V14.2174" stroke="#045940" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import blog7 from '@/assets/img/blog7.png'
import blog8 from '@/assets/img/blog8.png'
import blog9 from '@/assets/img/blog9.png'
import blog10 from '@/assets/img/blog10.png'
import blog11 from '@/assets/img/blog.png'
import { ref, computed } from 'vue';

// Blog data
const blogs = ref([
  {
    id: 1,
    title: 'Meet all the new Stack: The documentation platform you know, made effortless with AI',
    category: 'Lifestyle',
    date: 'Feb 24, 2024',
    image: blog7,
    description:
        "We've helped thousands of teams document their knowledge and create amazing public docs for their users. It's always been our goal to be your go-to platform for creating and collaborating on amazing documentation. Now we're...",
  },
  {
    id: 2,
    title: 'Meet all the new Stack: The documentation platform you know, made effortless with AI',
    category: 'Beauty',
    date: 'Feb 24, 2024',
    image: blog8,
    description:
        "We've helped thousands of teams document their knowledge and create amazing public docs for their users. It's always been our goal to be your go-to platform for creating and collaborating on amazing documentation. Now we're...",
  },
  {
    id: 3,
    title: 'Meet all the new Stack: The documentation platform you know, made effortless with AI',
    category: 'Beauty',
    date: 'Feb 24, 2024',
    image: blog9,
    description:
        "We've helped thousands of teams document their knowledge and create amazing public docs for their users. It's always been our goal to be your go-to platform for creating and collaborating on amazing documentation. Now we're...",
  },
  {
    id: 4,
    title: 'Meet all the new Stack: The documentation platform you know, made effortless with AI',
    category: 'Beauty',
    date: 'Feb 24, 2024',
    image: blog10,
    description:
        "We've helped thousands of teams document their knowledge and create amazing public docs for their users. It's always been our goal to be your go-to platform for creating and collaborating on amazing documentation. Now we're...",
  },
  {
    id: 5,
    title: 'Meet all the new Stack: The documentation platform you know, made effortless with AI',
    category: 'Beauty',
    date: 'Feb 24, 2024',
    image: blog11,
    description:
        "We've helped thousands of teams document their knowledge and create amazing public docs for their users. It's always been our goal to be your go-to platform for creating and collaborating on amazing documentation. Now we're...",
  }
]);

// Tabs
const tabs = ref(['All', 'Lifestyle', 'Beauty', 'Tech', 'Travel']);
const selectedTab = ref('All');
const searchQuery = ref('');

// Filter blogs based on tab selection and search query
const filteredBlogs = computed(() => {
  const query = searchQuery.value.toLowerCase();
  const filtered = blogs.value.filter((blog) => {
    const matchesTab = selectedTab.value === 'All' || blog.category === selectedTab.value;
    const matchesSearch = blog.title.toLowerCase().includes(query);
    return matchesTab && matchesSearch;
  });
  return filtered;
});

// Update selected tab
const filterBlogs = (tab: string) => {
  selectedTab.value = tab;
};
</script>
