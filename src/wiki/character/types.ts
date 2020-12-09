import type {
  CharacterCreateInput,
  CharacterProfileCreateInput,
  ElementCreateInput,
  TalentCreateInput,
} from '../../types/schema_0.4.0/schema';

// Parts of the output JSON (Always omit id and required connections as this is done in the parser)
interface CharacterOutput extends Omit<CharacterCreateInput, 'id'> {}
interface CharacterProfileOutput
  extends Omit<CharacterProfileCreateInput, 'id' | 'character'> {}
interface TalentOutput extends Omit<TalentCreateInput, 'id' | 'character'> {}
interface ElementOutput extends Omit<ElementCreateInput, 'id'> {}

// The output JSON
export interface CharactersOutput {
  character: CharacterOutput;
  characterProfile?: CharacterProfileOutput;
  talents?: TalentOutput[];
  elements?: ElementOutput[];
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
