<template>
  <section class="relative text-center bg-secondary">
    <!-- Background Image -->
    <img src="@/assets/img/blog-hero.png" alt="Hero Image" class="w-full h-[500px] object-cover" />

    <!-- Dark Transparent Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>

    <!-- Content -->
    <div class="absolute inset-0 flex flex-col justify-center items-center text-white">
      <h1 class="text-4xl font-bold mb-4">Blog and Articles</h1>
      <p class="max-w-2xl text-lg">
        A collection of hand-picked articles for freelancers, by freelancers. Deep dives, insights, and honest advice to navigate the freelance landscape.
      </p>
    </div>
  </section>
</template>

<style scoped>
/* Additional styles for responsiveness */
@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
  p {
    font-size: 1rem;
  }
}
</style>
