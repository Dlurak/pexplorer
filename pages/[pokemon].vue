<script lang="ts">
import { useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import type { PokemonDetails } from "~/types/pokemon";
import { type TElement, getBgColor } from "~/utils/elementColor";
import { prependNumber } from "~/utils/prependNumber";
import { getImageUrlForPokemon } from "~/utils/getImageUrl";

export default {
  data() {
    const route = useRoute();
    const name = route.params.pokemon;

    const query = async () => {
      const { data } = await useFetch<PokemonDetails>(
        `https://pokeapi.co/api/v2/pokemon/${name}`,
      );
      return data;
    };

    const { data } = useQuery({
      queryKey: ["pokemonDetails"],
      queryFn: async () => await query(),
    });

    return {
      name,
      api: {
        types: data.value?.types.map((t) => ({
          ...t,
          bgColor: getBgColor(t.type.name as TElement),
          fontColor: whiteOrBlackText(getBgColor(t.type.name as TElement)),
        })),
        bgColor: getBgColor(
          (data.value?.types[0]?.type.name as TElement) || "unknown",
        ),
        id: data.value?.id,
        weight: (data.value?.weight || 0) / 10,
        height: (data.value?.height || 0) / 10,

        available: !!data.value,
      },
    };
  },
};
</script>

<template>
  <div class="contents">
    <div
      v-if="api.available"
      :style="{
        '--bg': api.bgColor,
        '--txt': whiteOrBlackText(api.bgColor),
      }"
      class="shadow-xl flex flex-col md:flex-row justify-between bg-[var(--bg)] text-[var(--txt)] rounded-lg px-3 py-2"
    >
      <div class="flex flex-col justify-between">
        <div>
          <h2>{{ name }}</h2>
          <b v-if="api.id">#{{ prependNumber(api.id, 3) }}</b>
        </div>
        <div
          class="bg-white bg-opacity-50 text-black flex justify-between gap-3 rounded-md px-5 py-2"
        >
          <div class="flex flex-col items-center w-full">
            <span class="text-lg font-bold"> {{ api.height }}M </span>
            <span class="text-sm">Height</span>
          </div>
          <div class="w-0.5 py-1 rounded-full">
            <div class="bg-white bg-opacity-30 w-full h-full" />
          </div>
          <div class="flex flex-col items-center w-full">
            <span class="text-lg font-bold"> {{ api.weight }}KG </span>
            <span class="text-sm">Weight</span>
          </div>
        </div>
      </div>
      <NuxtImg v-if="api.id" :src="getImageUrlForPokemon(api.id)" />
    </div>
  </div>
</template>
