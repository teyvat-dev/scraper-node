import type { CharactersOutput } from './types';
import type { Storage } from '@google-cloud/storage';
import list from './list';
import profile from './profile';
import story from './story';

const scrape = async (storage: Storage): Promise<CharactersOutput[]> => {
  const tables = await list(storage);

  const profiles = await profile(
    tables.map(char => char.link || '').filter(link => link !== ''),
    storage
  );

  const stories = await story(
    tables
      .map(char => char.link || '')
      .filter(link => link !== '')
      .map(link => `${link}/Story`)
  );

  // Merge into singular array to upload (using types)
  const characters: CharactersOutput[] = tables.map(char => {
    const profile = profiles.find(item => item.name === char.name);
    const story = stories.find(item => item.name === char.name);

    return {
      character: {
        name: char.name,
        icon: char.image && `http://${char.image}`,
        rarity: char.rarity,
        constellations: profile && profile.constellations,
        overview: profile && profile.introduction,
        weapon: char.weapon as CharactersOutput['character']['weapon'], // Required for enum typing
      },
      characterProfile: {
        affiliation: profile?.affiliation,
        birthday: profile?.birthday,
        constellation: profile?.constellation,
        images: {
          cardImage: profile?.cardImage && `http://${profile.cardImage}`,
          portraitImage:
            profile?.portraitImage && `http://${profile.portraitImage}`,
          inGameImage: profile?.inGameImage && `http://${profile.inGameImage}`,
        },
        story: story?.story,
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
      elements:
        char.element === 'Adaptive'
          ? [{ name: 'Anemo' }, { name: 'Geo' }]
          : [{ name: char.element }],
      region: char.nation,
    };
  });

  return characters;
};

export default scrape;
