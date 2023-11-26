<script setup>
import PokemonId from "./PokemonCard/PokemonId.vue";
const props = defineProps({
  name: {
    type: String,
    required: false,
    default: "",
  },
});
</script>

<template>
  <div
    :style="{
      '--bg': getBgColor('unknown'),
      '--txt': whiteOrBlackText(getBgColor('unknown')),
    }"
    class="w-full rounded-lg flex flex-row justify-between p-2 h-full bg-[var(--bg)] text-[var(--txt)]"
  >
    <div class="flex flex-col justify-between">
      <h3 class="mb-2.5">
        <span v-if="props.name">{{ props.name }}</span>
        <span v-else class="max-w-full inline-block w-16 h-8">
          <LoadingBox />
        </span>
      </h3>
      <div>
        <b>Type:</b>
        <div class="w-full h-6 flex px-1 py-0.5 gap-0.5">
          <LoadingBox />
          <LoadingBox />
        </div>
      </div>
      <PokemonId :poid="1" />
    </div>

    <div class="w-32 min-h-32 h-full">
      <NuxtImg src="/pokeball.svg" class="animate-[spin_15s_infinite_linear]" />
    </div>
  </div>
</template>
