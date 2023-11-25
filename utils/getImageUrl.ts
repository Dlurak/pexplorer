const baseImagePath =
  "https://cdn.statically.io/gh/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

type ImagePath<T extends number> = `${typeof baseImagePath}${T}.png`;

export const getImageUrlForPokemon = <T extends number>(
  index: T,
): ImagePath<T> => `${baseImagePath}${index}.png`;
