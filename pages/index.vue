<script lang="ts" setup>
import { useInfiniteQuery } from "@tanstack/vue-query";
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

const query = async ({ pageParam = 0 }) => {
  const perPage = 15;
  const offset = pageParam * perPage;
  const response = await useFetch<PokeResponse>(
    `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${perPage}`,
  );
  return response.data.value;
};

const { data, error, fetchNextPage, isFetchingNextPage, hasNextPage } =
  useInfiniteQuery({
    queryKey: ["pokemonList"],
    queryFn: query,
    getNextPageParam: (_, __, currentPage) => currentPage + 1,
    initialPageParam: 0,
  });
</script>

<template>
  <div>
    <div v-if="error">Something went wrong :/</div>
    <div v-if="data && data.pages" class="gap-3 flex flex-col">
      <ul
        v-for="page of data.pages"
        :key="page?.count"
        class="grid grid-cols-[repeat(auto-fit,minmax(min(20rem,100%),1fr))] gap-3"
      >
        <li v-for="result of page?.results || []" :key="result.name">
          <PokemonCard :name="result.name" :url="result.url" />
        </li>
      </ul>
      <ul
		  v-if="isFetchingNextPage"
        class="grid grid-cols-[repeat(auto-fit,minmax(min(20rem,100%),1fr))] gap-3"
      >
        <li v-for="_ of new Array(15).fill(null)">
          <SkeletonCard />
        </li>
      </ul>
      <button
        :disabled="isFetchingNextPage || !hasNextPage"
        @click="() => fetchNextPage()"
      >
        Fetch next page
      </button>
    </div>
  </div>
</template>
