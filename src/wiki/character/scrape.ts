import type { CharactersOutput } from './types';
import type { Storage } from '@google-cloud/storage';
import list from './list';
import profile from './profile';
import story from './story';
import traveler from './traveler';
import { wikiBaseURI } from '../../constants';

const scrape = async (storage: Storage): Promise<CharactersOutput[]> => {
  const tables = await list(storage);

  // Handle traveler
  const travelerIndex = tables.findIndex(char => char.name === 'Traveler');
  const travelerInfo = tables[travelerIndex];
  const travelerProfiles = await traveler(`${wikiBaseURI}/Traveler`, storage);

  const stories = await story(
    tables
      .map(char => char.link || '')
      .filter(link => link !== '')
      .map(link => `${link}/Story`)
  );

  tables.splice(travelerIndex, 1);

  const profiles = await profile(
    tables.map(char => char.link || '').filter(link => link !== ''),
    storage
  );

  // Merge into singular array to upload (using types)
  const characters: CharactersOutput[] = tables.map(char => {
    const profile = profiles.find(item => item.name === char.name);
    const story = stories.find(item => item.name === char.name);

    return {
      character: {
        name: char.name,
        icon: char.image && `https://${char.image}`,
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
          cardImage: profile?.cardImage && `https://${profile.cardImage}`,
          portraitImage:
            profile?.portraitImage && `https//${profile.portraitImage}`,
          inGameImage: profile?.inGameImage && `https://${profile.inGameImage}`,
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

  // Again handle traveller differently
  const travelerStory = stories.find(story => story.name === 'Traveler');

  characters.push({
    character: {
      name: 'Aether',
      icon: travelerInfo.image && `https://${travelerInfo.image}`,
      rarity: travelerInfo.rarity,
      constellations: travelerProfiles[0]?.constellations,
      overview: travelerProfiles[0]?.introduction,
      weapon: travelerInfo.weapon as CharactersOutput['character']['weapon'], // Required for enum typing
    },
    characterProfile: {
      affiliation: travelerProfiles[0]?.affiliation,
      birthday: travelerProfiles[0]?.birthday,
      constellation: travelerProfiles[0]?.constellation,
      images: {
        cardImage:
          travelerProfiles[0]?.cardImage &&
          `https://${travelerProfiles[0].cardImage}`,
        portraitImage:
          travelerProfiles[0]?.portraitImage &&
          `https//${travelerProfiles[0].portraitImage}`,
        inGameImage:
          travelerProfiles[0]?.inGameImage &&
          `https://${travelerProfiles[0].inGameImage}`,
      },
      story: travelerStory?.story,
      // specialtyDish: profile && profile.specialtyDish
      overview: travelerProfiles[0]?.personality,
      voiceActor: {
        en: travelerProfiles[0]?.voiceEN,
        cn: travelerProfiles[0]?.voiceCN,
        jp: travelerProfiles[0]?.voiceJP,
        kr: travelerProfiles[0]?.voiceKR,
      },
    },
    talents: travelerProfiles[0]?.talents.map(talent => ({
      name: talent.name,
      description: talent.info,
      type: talent.type,
    })),
    elements: [{ name: 'Anemo' }, { name: 'Geo' }],
    region: travelerInfo.nation,
  });

  characters.push({
    character: {
      name: 'Lumine',
      icon: travelerInfo.image && `https://${travelerInfo.image}`,
      rarity: travelerInfo.rarity,
      constellations: travelerProfiles[1]?.constellations,
      overview: travelerProfiles[1]?.introduction,
      weapon: travelerInfo.weapon as CharactersOutput['character']['weapon'], // Required for enum typing
    },
    characterProfile: {
      affiliation: travelerProfiles[1]?.affiliation,
      birthday: travelerProfiles[1]?.birthday,
      constellation: travelerProfiles[1]?.constellation,
      images: {
        cardImage:
          travelerProfiles[1]?.cardImage &&
          `https://${travelerProfiles[1].cardImage}`,
        portraitImage:
          travelerProfiles[1]?.portraitImage &&
          `https//${travelerProfiles[1].portraitImage}`,
        inGameImage:
          travelerProfiles[1]?.inGameImage &&
          `https://${travelerProfiles[1].inGameImage}`,
      },
      story: travelerStory?.story,
      // specialtyDish: profile && profile.specialtyDish
      overview: travelerProfiles[1]?.personality,
      voiceActor: {
        en: travelerProfiles[1]?.voiceEN,
        cn: travelerProfiles[1]?.voiceCN,
        jp: travelerProfiles[1]?.voiceJP,
        kr: travelerProfiles[1]?.voiceKR,
      },
    },
    talents: travelerProfiles[1]?.talents.map(talent => ({
      name: talent.name,
      description: talent.info,
      type: talent.type,
    })),
    elements: [{ name: 'Anemo' }, { name: 'Geo' }],
    region: travelerInfo.nation,
  });

  return characters;
};

export default scrape;
