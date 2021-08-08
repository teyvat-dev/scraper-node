import type { CharactersOutput } from './types';
import list from './list';
import profile from './profile';
import story from './story';
import traveler from './traveler';
import { wikiBaseURI } from '../../constants';

const scrape = async (): Promise<CharactersOutput[]> => {
  const tables = await list();

  // Handle traveler
  const travelerIndex = tables.findIndex(char => char.name === 'Traveler');
  const travelerInfo = tables[travelerIndex];
  const travelerProfiles = await traveler(`${wikiBaseURI}/Traveler`);

  const stories = await story(
    tables
      .map(char => char.link || '')
      .filter(link => link !== '')
      .map(link => `${link}/Story`)
  );

  tables.splice(travelerIndex, 1);

  const profiles = await profile(
    tables.map(char => char.link || '').filter(link => link !== '')
  );

  // Merge into singular array to upload (using types)
  const characters: CharactersOutput[] = tables.map(char => {
    const profile = profiles.find(item => item.name === char.name);
    const story = stories.find(item => item.name === char.name);

    return {
      character: {
        name: char.name,
        icon: char.image,
        rarity: char.rarity,
        constellations: profile && profile.constellations,
        overview: profile && profile.introduction,
        weapon: char.weapon as CharactersOutput['character']['weapon'], // Required for enum typing
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        element: char.element,
      },
      characterProfile: {
        affiliation: profile?.affiliation,
        birthday: profile?.birthday,
        constellation: profile?.constellation,
        images: {
          cardImage: profile?.cardImage,
          portraitImage: profile?.portraitImage,
          inGameImage: profile?.inGameImage,
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
      region: char.nation,
    };
  });

  // Again handle traveller differently
  const travelerStory = stories.find(story => story.name === 'Traveler');

  // Add characters
  for (const profile of travelerProfiles) {
    let region;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (profile.element === 'Anemo') {
      region = 'Mondstadt';
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (profile.element === 'Geo') {
      region = 'Liyue';
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (profile.element === 'Electro') {
      region = 'Inazuma';
    }
    characters.push({
      character: {
        name: profile.name,
        icon: travelerInfo.image,
        rarity: travelerInfo.rarity,
        constellations: profile && profile.constellations,
        overview: profile && profile.introduction,
        weapon: travelerInfo.weapon as CharactersOutput['character']['weapon'], // Required for enum typing
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        element: profile.element,
      },
      characterProfile: {
        affiliation: profile?.affiliation,
        birthday: profile?.birthday,
        constellation: profile?.constellation,
        images: {
          cardImage: profile?.cardImage,
          portraitImage: profile?.portraitImage,
          inGameImage: profile?.inGameImage,
        },
        story: travelerStory?.story,
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
      region,
    });
  }

  return characters;
};

export default scrape;
