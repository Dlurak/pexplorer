<script setup lang="ts">
import type { PokemonType } from "../../types/pokemon";

defineProps<{
  types: PokemonType[];
}>();
</script>

<template>
  <ul class="flex gap-1 flex-wrap">
    <li v-for="type in types" :key="type.slot" class="capitalize">
      {{ type.type.name }}
      <span v-if="!isLastElementOfList(type, types)">,</span>
    </li>
  </ul>
</template>
