<script lang="ts" setup>
import type { PokemonDetails } from "../types/pokemon";
import PokemonTypes from "./PokemonCard/PokemonTypes.vue";
import PokemonId from "./PokemonCard/PokemonId.vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const response = useFetch<PokemonDetails>(props.url);
const data = response.data;
</script>

<template>
  <div v-if="data" class="rounded-lg flex flex-col p-2 h-full">
    <h3 class="mb-2.5">{{ props.name }}</h3>
    <div class="w-full flex">
      <div class="w-full flex justify-between flex-col">
        <div>
          <b>Type:</b>
          <PokemonTypes :types="data.types" />
        </div>
        <PokemonId :poid="data.id" />
      </div>

      <div class="flex items-center justify-center w-1/2">
        <NuxtImg :src="getImageUrlForPokemon(data.id)" />
      </div>
    </div>
  </div>
</template>
