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
const textColor = ref<"white" | "black">(whiteOrBlackText(bgHex.value));

const response = useFetch<PokemonDetails>(props.url, {
  onResponse({ response }) {
    const colorString = response._data.types[0]?.type.name || "unknown";
    bgHex.value = getBgColor(colorString);
    textColor.value = whiteOrBlackText(bgHex.value);
  },
});
const { pending, data } = response;
</script>

<template>
  <div :style="{ '--bg': bgHex, '--txt': textColor }" class="card">
    <div v-if="pending" class="h-full flex items-center justify-center">
      <SkeletonCard :name="props.name" />
    </div>
    <div v-else-if="data" class="w-full flex">
      <div class="w-full flex justify-between flex-col">
        <h3 class="mb-2.5">{{ props.name }}</h3>
        <div class="flex gap-4">
          <div>
            <b>Type:</b>
            <PokemonTypes :types="data.types" />
          </div>
          <div>
            <div class="flex gap-1 items-center">
              <Icon name="fa6-solid:weight-hanging" />
              {{ data.weight / 10 }}KG
            </div>
            <div class="flex gap-1 items-center">
              <Icon name="fa6-solid:ruler-vertical" />
              {{ data.height / 10 }}M
            </div>
          </div>
        </div>
        <PokemonId :poid="data.id" />
      </div>

      <div
        class="flex items-center justify-center w-1/2 relative isolate min-h-[8rem] aspect-square"
      >
        <div class="absolute -z-10 right-0 bottom-0 w-full">
          <NuxtImg src="/pokeball.svg" class="rotate-12 w-full h-full" />
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
  @apply rounded-lg flex flex-col p-2 h-full bg-[var(--bg)] text-[var(--txt)];
}
</style>
