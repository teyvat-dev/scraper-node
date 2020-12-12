import type { Create } from '@teyvatdev/types';

// The output JSON
export interface CharactersOutput {
  character: Create.Character;
  characterProfile?: Omit<Create.CharacterProfile, 'character' | 'region'>;
  talents?: Omit<Create.Talent, 'character'>[];
  elements?: Create.Element[];
  region?: string;
}

// Temporary Scraper Data Interfaces
export interface CharacterTableData {
  rarity: number;
  image?: string;
  name: string;
  element: string;
  weapon: string;
  sex: string;
  nation: string;
  link?: string;
}

export interface CharacterProfilesData {
  name: string;
  image?: string;
  introduction: string;
  personality: string;
  birthday: string;
  constellation: string;
  affiliation: string;
  dish: string;
  voiceEN: string;
  voiceCN: string;
  voiceJP: string;
  voiceKR: string;
  talents: {
    type: string;
    name: string;
    icon?: string;
    info: string;
  }[];
  constellations: {
    level: number;
    name: string;
    effect: string;
  }[];
}
