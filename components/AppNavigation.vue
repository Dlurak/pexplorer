<script>
const entries = [
  {
    name: "Home",
    uri: "/",
    icon: "heroicons:home-solid",
  },
  {
    name: "Games",
    uri: "/games",
    icon: "heroicons:puzzle-piece-solid",
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
    class="absolute sm:static sm:bg-gradient-to-r sm:bottom-auto bg-gradient-to-t from-orange-50 via-orange-50 sm:via-white to-white bottom-0 w-full py-2 sm:h-full"
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
          class="aspect-square p-1 rounded-sm hover:bg-gray-100 focus:bg-gray-100 transition-colors flex items-center gap-1 sm:aspect-auto sm:w-full"
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
