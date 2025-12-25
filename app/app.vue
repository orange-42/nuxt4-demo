<template>
  <div class="min-h-screen p-4 sm:p-8">
    <div class="max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden ring-1 ring-gray-200">
      <!-- Header -->
      <header class="bg-indigo-600 p-6">
        <h1 class="text-3xl font-bold text-white flex items-center gap-3">
          <Icon name="uil:list-ul" class="w-8 h-8" />
          Nuxt 4 Tasks
        </h1>
        <p class="text-indigo-200 mt-2 text-sm">Fullstack Nuxt 4 • Pinia • Tailwind</p>
      </header>

      <!-- Main Router View -->
      <main class="p-6">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>
