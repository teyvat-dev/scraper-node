import type { CharactersOutput } from './types';
import list from './list';
import profile from './profile';

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
        weapon: char.weapon as CharactersOutput['character']['weapon'], // Required for enum typing
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
