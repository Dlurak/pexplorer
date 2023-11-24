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
      entries: entries,
    };
  },
};
</script>

<template>
  <nav
    class="absolute bg-gradient-to-t from-orange-50 via-orange-50 to-white bottom-0 w-full py-2"
  >
    <ul class="flex justify-evenly flex-row">
      <li v-for="entry of entries" class="flex items-center gap-1">
        <a
          :href="entry.uri"
          :title="entry.name"
          class="aspect-square p-1 rounded-sm hover:bg-gray-100 focus:bg-gray-100 transition-colors"
        >
          <Icon :name="entry.icon" size="1.5rem" />
        </a>
      </li>
    </ul>
  </nav>
</template>
