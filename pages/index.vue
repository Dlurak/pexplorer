<script lang="ts" setup>
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

const response = await useFetch<PokeResponse>(
  "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=5",
);
const data = response.data.value;
</script>

<template>
  <div>
    <ul
      v-if="data"
      class="grid grid-cols-[repeat(auto-fit,minmax(min(18rem,100%),1fr))] gap-3"
    >
      <li v-for="result of data.results" :key="result.name">
        <PokemonCard :name="result.name" :url="result.url" />
      </li>
    </ul>
  </div>
</template>
