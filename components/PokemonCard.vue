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

const bgHex = ref<string>(getBgColor("unknown"));

const response = useFetch<PokemonDetails>(props.url, {
  onResponse({ response }) {
    const colorString = response._data.types[0]?.type.name || "unknown";
    bgHex.value = getBgColor(colorString);
  },
});
const { pending, data } = response;

const tailwindBg = "bg-[var(--bg)]";
</script>

<template>
  <div :style="{ '--bg': bgHex }" :class="{ card: true, [tailwindBg]: true }">
    <div v-if="pending" class="h-full flex items-center justify-center">
      Loading
    </div>
    <div v-else-if="data" class="w-full flex">
      <div class="w-full flex justify-between flex-col">
        <h3 class="mb-2.5">{{ props.name }}</h3>
        <div>
          <b>Type:</b>
          <PokemonTypes :types="data.types" />
        </div>
        <PokemonId :poid="data.id" />
      </div>

      <div class="flex items-center justify-center w-1/2 relative isolate">
        <div class="absolute -z-10 right-0 bottom-0 w-full">
          <NuxtImg src="/pokeball.svg" class="rotate-12 w-[150%] h-[150%]" />
        </div>
        <NuxtImg
          :src="getImageUrlForPokemon(data.id)"
          class="z-10"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>

<style>
.card {
  @apply rounded-lg flex flex-col p-2 h-full;
}
</style>
