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

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonDetails = {
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
