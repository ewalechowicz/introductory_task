type Version = {
  name: string;
  url: string;
};

type Ability = {
  name: string;
  url: string;
};

type AbilityDetails = {
  is_hidden: boolean;
  slot: number;
  ability: Ability;
};

type Form = {
  name: string;
  url: string;
};

type GameIndex = {
  game_index: number;
  version: Version;
};

type Item = {
  name: string;
  url: string;
};

type VersionDetail = {
  rarity: number;
  version: Version;
};

type HeldItem = {
  item: Item;
  version_details: VersionDetail[];
};

type Move = {
  name: string;
  url: string;
};

type MoveLearnMethod = {
  name: string;
  url: string;
};

type MoveVersionGroupDetail = {
  level_learned_at: number;
  version_group: Version;
  move_learn_method: MoveLearnMethod;
};

type PokemonMove = {
  move: Move;
  version_group_details: MoveVersionGroupDetail[];
};

type SpriteLinks = {
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
};

type OtherSprites = {
  dream_world: SpriteLinks;
  home: SpriteLinks;
  official_artwork: SpriteLinks;
  showdown: SpriteLinks;
};

type GenerationSprites = {
  [key: string]: {
    [key: string]: SpriteLinks;
  };
};

type CryLinks = {
  latest: string;
  legacy: string;
};

type Stat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

type TypeSlot = {
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
  abilities: AbilityDetails[];
  forms: Form[];
  game_indices: GameIndex[];
  held_items: HeldItem[];
  // location_area_encounters: string;
  moves: PokemonMove[];
  species: {
    name: string;
    url: string;
  };
  sprites: SpriteLinks;
  other: OtherSprites;
  versions: GenerationSprites;
  cries: CryLinks;
  stats: Stat[];
  types: TypeSlot[];
  past_types: {
    generation: Version;
    types: TypeSlot[];
  }[];
};

export type Pokemon = {
  url: string;
  name: string;
};
