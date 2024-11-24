<template>
  <div class="max-w-5xl pb-20 mx-auto px-4 lg:px-12 py-8">
    <!-- Back Link -->
    <div class="mb-6">
      <NuxtLink to="/blogs" class="text-gray-600 flex items-center hover:underline">
        <span class="mr-2"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.8 13.6004L8.19995 10.0004L11.8 6.40039" stroke="#525252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</span> Blog
      </NuxtLink>
    </div>

    <!-- Blog Title -->
    <h1 class="text-3xl lg:text-4xl font-bold text-[#0A0A0A] mb-4">
      Elysian Beauty isn’t just a service; it’s a journey to transformation.
    </h1>

    <!-- Blog Metadata -->
    <div class="text-[#525252] text-sm mb-6">
      <span class="text-[#045940] font-semibold">Lifestyle</span> | Jan 24, 2023
    </div>

    <!-- Blog Image -->
    <div class="mb-8">
      <img
          src="@/assets/img/blog9.png"
          alt="Blog Image"
          class="w-full h-auto rounded-lg object-cover"
      />
    </div>

    <!-- Blog Content -->
    <div class="prose prose-lg max-w-none text-[#525252]">
      <p>
        Duis nisi neque aliquam phasellus leo blandit. Mauris dictumst tincidunt
        quam neque vitae ridiculus massa. Facilisis aliquam ut sit dignissim
        sollicitudin ullamcorper vel ultrices consequat. Accumsan habitasse
        ipsum blandit et urna tincidunt. Integer nibh ultricies nisl sed ac
        convallis.
      </p>
      <p>
        Duis nisi neque aliquam phasellus leo blandit. Mauris dictumst tincidunt
        quam neque vitae ridiculus massa. Facilisis aliquam ut sit dignissim
        sollicitudin ullamcorper vel ultrices consequat. Accumsan habitasse
        ipsum blandit et urna tincidunt. Integer nibh ultricies nisl sed ac
        convallis.
      </p>

      <!-- Subheading -->
      <h2 class="text-2xl font-semibold mt-8 mb-4">
        Understanding the Importance of Feedback
      </h2>

      <p>
        Duis nisi neque aliquam phasellus leo blandit. Mauris dictumst tincidunt
        quam neque vitae ridiculus massa. Facilisis aliquam ut sit dignissim
        sollicitudin ullamcorper vel ultrices consequat. Accumsan habitasse
        ipsum blandit et urna tincidunt. Integer nibh ultricies nisl sed ac
        convallis.
      </p>

      <!-- Numbered List -->
      <ol class="list-decimal pl-6 space-y-8 mt-6">
        <li v-for="item in 5">
          <strong>Understanding the Importance of Feedback</strong>
          <p class="leading-relaxed">
            Duis nisi neque aliquam phasellus leo blandit. Mauris dictumst
            tincidunt quam neque vitae ridiculus massa. Facilisis aliquam ut sit
            dignissim sollicitudin ullamcorper vel ultrices consequat. Accumsan
            habitasse ipsum blandit et urna tincidunt. Integer nibh ultricies
            nisl sed ac convallis.
          </p>
        </li>
      </ol>
    </div>
  </div>
</template>
