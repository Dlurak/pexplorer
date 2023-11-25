<script lang="ts" setup>
import { getImageUrlForPokemon } from "../utils/getImageUrl";

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

type PokemonAbility = {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
    url: string;
  };
};

type PokemonForm = {
  name: string;
  url: string;
};

type GameIndex = {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
};

type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

type PokemonDetails = {
  id: number;
  name: string;
  base_experience: number;

  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];

  forms: PokemonForm[];
  game_indices: GameIndex[];
  types: PokemonType[];
};

const response = useFetch<PokemonDetails>(props.url);
const data = response.data;
</script>

<template>
  <div class="rounded-lg flex">
    <div>
      <h3 class="capitalize">{{ props.name }}</h3>
      <div v-if="data" class="contents">
        <div>
          <div>
            <b>Type:</b>
            <ul>
              <li v-for="type in data.types" :key="type.slot">
                {{ type.type.name }}
              </li>
            </ul>
          </div>
          <div>
            {{ data.id }}
          </div>
        </div>
        <div>
          <NuxtImg :src="getImageUrlForPokemon(data.id)" />
        </div>
      </div>
    </div>
  </div>
</template>
