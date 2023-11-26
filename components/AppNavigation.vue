<script>
const entries = [
  {
    name: "Overview",
    uri: "/",
    icon: "heroicons:square-2-stack-solid",
  },
];

export default {
  data() {
    return {
      entries,
    };
  },
};
</script>

<template>
  <nav
    class="fixed z-20 sm:static sm:bg-gradient-to-r sm:bottom-auto bg-slate-50 dark:bg-zinc-900 bottom-0 w-full py-2 sm:h-full"
  >
    <ul class="flex justify-evenly flex-row sm:gap-1 sm:flex-col">
      <li
        v-for="entry of entries"
        :key="entry.name"
        class="flex items-center gap-1 sm:px-2"
      >
        <a
          :href="entry.uri"
          :title="entry.name"
          class="aspect-square p-1 rounded-sm hover:bg-gray-100 focus:bg-gray-100 hover:dark:bg-neutral-800 focus:dark:bg-neutral-800 transition-colors flex items-center gap-1 sm:aspect-auto sm:w-full"
        >
          <Icon :name="entry.icon" size="1.5rem" />
          <span class="hidden sm:inline-block">
            {{ entry.name }}
          </span>
        </a>
      </li>
    </ul>
  </nav>
</template>
