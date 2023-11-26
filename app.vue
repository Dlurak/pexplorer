<script>
import "./styles/global.css";
</script>

<template>
  <div
    class="flex min-h-screen bg-slate-50 dark:bg-zinc-900 text-black dark:text-white"
  >
    <!-- <div class="w-0 sm:w-1/4 flex gap-0.5"> -->
    <!--   <AppNavigation /> -->
    <!--   <div class="bg-gray-200 dark:bg-gray-800 w-0.5" /> -->
    <!-- </div> -->
    <!-- Padding bottom on small screens due to the navigation -->

    <!-- <main class="px-2 sm:w-3/4 w-full sm:px-4 py-2 pb-14 sm:pb-2"> -->
    <main class="px-2 w-full sm:px-4 py-2">
      <NuxtPage />
    </main>
  </div>
</template>
