<template>
  <div
    class="flex min-h-screen bg-slate-50 dark:bg-zinc-900 text-black dark:text-white"
  >
    <div class="w-0 sm:w-1/3 flex gap-0.5">
      <AppNavigation />
      <div class="bg-gray-200 dark:bg-gray-800 w-0.5" />
    </div>
    <main class="px-2 sm:w-2/3">
      <NuxtPage />
    </main>
  </div>
</template>
