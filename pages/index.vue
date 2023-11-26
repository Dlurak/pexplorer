<script lang="ts" setup>
import { useInfiniteQuery } from "@tanstack/vue-query";
import { ref, onMounted, onBeforeUnmount } from "vue";

type PokemonBase = {
  name: string;
  url: string;
};

type PokeResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonBase[];
};

const bottomElement = ref<HTMLDivElement | null>(null);

const query = async ({ pageParam = 0 }) => {
  const perPage = 15;
  const offset = pageParam * perPage;
  const response = await useFetch<PokeResponse>(
    `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${perPage}`,
  );
  return response.data.value;
};

const { data, error, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
  queryKey: ["pokemonList"],
  queryFn: query,
  getNextPageParam: (_, __, currentPage) => currentPage + 1,
  initialPageParam: 0,
});

const flat = () => {
  const pages = data?.value?.pages || [];
  let results: PokemonBase[] = [];
  pages.forEach((page) => {
    const pageResults = page?.results || [];
    results = [...results, ...pageResults];
  });
  return results;
};

const falsePromise: Promise<false> = new Promise((resolve) => {
  resolve(false);
});
const checkBottom = () => {
  const rect = bottomElement.value?.getBoundingClientRect();
  if (!rect) return falsePromise;

  const isAtBottom = rect.bottom - 150 <= window.innerHeight;
  if (isAtBottom && !isFetchingNextPage.value) {
    return fetchNextPage().then(() => true);
  }
  return falsePromise;
};

onMounted(() => {
  window.addEventListener("scroll", checkBottom);
  window.addEventListener("resize", checkBottom);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", checkBottom);
  window.removeEventListener("resize", checkBottom);
});
</script>

<template>
  <div class="lg:px-20">
    <div v-if="error">Something went wrong :/</div>
    <div v-if="data && data.pages" class="gap-3 flex flex-col">
      <ul
        class="grid grid-cols-[repeat(auto-fit,minmax(min(25rem,100%),1fr))] gap-3"
      >
        <li v-for="result of flat()" :key="result.name">
          <PokemonCard :name="result.name" :url="result.url" />
        </li>

        <div v-if="isFetchingNextPage" class="contents">
          <li v-for="_ of new Array(15).fill(null)">
            <SkeletonCard />
          </li>
        </div>
      </ul>
      <div ref="bottomElement" />

      <div class="flex items-center justify-center">
        <button
          class="border-blue-300 border-solid border-2 rounded-md px-3 py-1 bg-blue-200 bg-opacity-50 dark:bg-blue-800 dark:bg-opacity-50 dark:border-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="isFetchingNextPage"
          @click="() => fetchNextPage()"
        >
          Load more
        </button>
      </div>
    </div>
  </div>
</template>
