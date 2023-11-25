<script setup lang="ts">
defineProps<{
  poid: Number;
}>();
</script>

<template>
  <div
    class="flex justify-center bg-zinc-700 dark:bg-white dark:bg-opacity-20 bg-opacity-20 rounded-full px-1.5 w-12"
  >
    {{ prependNumber(poid, 3) }}
  </div>
</template>
