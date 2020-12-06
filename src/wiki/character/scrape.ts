import type {
  CharacterCreateInput,
  CharacterProfileCreateInput,
  ElementCreateInput,
  EnumWeaponTypeFieldUpdateOperationsInput,
  TalentCreateInput,
} from '../../types/schema_0.3.1/schema';
import list from './list';
import profile from './profile';

interface CharacterOutput extends Omit<CharacterCreateInput, 'id'> {}
interface CharacterProfileOutput
  extends Omit<CharacterProfileCreateInput, 'id' | 'character'> {}
interface TalentOutput extends Omit<TalentCreateInput, 'id' | 'character'> {}
interface ElementOutput extends Omit<ElementCreateInput, 'id'> {}

interface CharactersOutput {
  character: CharacterOutput;
  characterProfile?: CharacterProfileOutput;
  talents?: TalentOutput[];
  elements?: ElementOutput[];
}

const scrape = async (): Promise<CharactersOutput[]> => {
  const tables = await list();

  const profiles = await profile(
    tables.map(char => char.link || '').filter(link => link !== '')
  );

  // Merge into singular array to upload (using types)
  const characters: CharactersOutput[] = tables.map(char => {
    const profile = profiles.find(item => item.name === char.name);

    return {
      character: {
        name: char.name,
        rarity: char.rarity,
        constellations: profile && profile.constellations,
        overview: profile && profile.introduction,
        weapon: char.weapon as EnumWeaponTypeFieldUpdateOperationsInput['set'],
      },
      characterProfile: {
        affiliation: profile?.affiliation,
        birthday: profile?.birthday,
        constellation: profile?.constellation,
        // specialtyDish: profile && profile.specialtyDish
        overview: profile?.personality,
        voiceActor: {
          en: profile?.voiceEN,
          cn: profile?.voiceCN,
          jp: profile?.voiceJP,
          kr: profile?.voiceKR,
        },
      },
      talents: profile?.talents.map(talent => ({
        name: talent.name,
        description: talent.info,
        type: talent.type,
      })),
      elements: [{ name: char.element }],
    };
  });

  return characters;
};

export default scrape;
