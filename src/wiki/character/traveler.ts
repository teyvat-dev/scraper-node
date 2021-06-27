import type { CharacterProfilesData } from './types';
import { fetch } from '../../helpers/fetch';

const removeSplit = (
  original: string,
  remove: string[],
  denominator: string
) => {
  const temp = original.split(denominator);

  for (const removalString of remove) {
    const removeSplit = temp.findIndex(split => split.includes(removalString));
    if (removeSplit !== -1) {
      temp.splice(removeSplit, 1);
    }
  }
  return temp.join(denominator);
};

const removeFinalSplit = (original: string, denominator: string) => {
  const temp = original.split(denominator);

  temp.pop();

  return temp.join(denominator);
};

const traveler = async (link: string): Promise<CharacterProfilesData[]> => {
  const $ = await fetch(link);

  const travelers = [];

  for (const name of ['Aether', 'Lumine']) {
    const cardImage = $(
      `div#pi-tab-${name === 'Aether' ? 0 : 1} img.pi-image-thumbnail`
    )
      .attr('src')
      ?.split('/revision/latest/')[0];

    const portraitImage = $(
      `div#pi-tab-${name === 'Aether' ? 2 : 3} img.pi-image-thumbnail`
    )
      .attr('src')
      ?.split('/revision/latest/')[0];

    const inGameImage = $(
      `div#pi-tab-${name === 'Aether' ? 4 : 5} img.pi-image-thumbnail`
    )
      .attr('src')
      ?.split('/revision/latest/')[0];
    const introduction = removeSplit(
      $('h3 span#Introduction').parent().next().text(),
      ['Official Website', 'In-game'],
      '.'
    );
    const personality = removeSplit(
      $('h3 span#Personality').parent().next().text(),
      ['Official Website', 'In-game'],
      '.'
    );

    const bio = $('div.pi-section-content[data-ref="0"]');
    const birthday = bio.find('div.pi-item[data-source="birthday"] div').text();
    const constellation = bio
      .find('div.pi-item[data-source="constellation"] div')
      .text();
    const affiliation = bio
      .find('div.pi-item[data-source="affiliation"] div')
      .text();
    const dish = bio.find('div.pi-item[data-source="dish"] div').text();

    const voiceActors = $('div.pi-section-content[data-ref="1"]');
    const voiceEN = voiceActors
      .find('div.pi-item[data-source="voiceEN"] div')
      .text();
    const voiceCN = voiceActors
      .find('div.pi-item[data-source="voiceCN"] div')
      .text();
    const voiceJP = voiceActors
      .find('div.pi-item[data-source="voiceJP"] div')
      .text();
    const voiceKR = voiceActors
      .find('div.pi-item[data-source="voiceKR"] div')
      .text();

    const elementTabs = $('h3 span#Ascensions')
      .parent()
      .prev()
      .children()
      .toArray();

    const talents: {
      type: string;
      name: string;
      icon?: string;
      info: string;
    }[] = [];

    const constellations: {
      level: number;
      name: string;
      icon?: string;
      effect: string;
    }[] = [];

    for (const tab of elementTabs) {
      const alignment = $(tab).attr('title');
      if (alignment === 'Unaligned') continue;
      if (alignment === undefined) continue;

      const talentHeading = $(tab).find(`h3 span#${alignment}_Talents`);
      const talentTable = $(talentHeading).parent().next();
      // TODO: Talents have their own page that can be scraped for skill attributes!
      // https://genshin-impact.fandom.com/wiki/Sharpshooter

      const talentPairs = $(talentTable)
        .find('tbody tr')
        .toArray()
        .map((talent, index) => {
          // Skip if even element
          if (index % 2 === 0) {
            return null;
          }
          // Skip if is header
          if ($(talent).find('th').length > 0) {
            return null;
          }

          return [talent, $(talent).next()];
        })
        .filter(talentPair => talentPair !== null);

      const tempTalents = talentPairs
        .map(talentPair => {
          // Failsafe
          if (
            talentPair === null ||
            talentPair[0] === null ||
            talentPair[1] === null
          ) {
            return { type: '', name: '', icon: '', info: '' };
          }

          const icon = $(talentPair[0])
            .find('td:nth-of-type(1) a img')
            .attr('data-src');
          const name = $(talentPair[0])
            .find('td:nth-of-type(2)')
            .text()
            .replace('\n', '');
          const type = $(talentPair[0])
            .find('td:nth-of-type(3)')
            .text()
            .split('-')[0]
            .replace(/\s/g, '')
            .replace(/[0-9]/g, '');
          const info = removeFinalSplit(
            $(talentPair[1]).find('td').text(),
            '.'
          );

          if (!type) {
            return { type: '', name: '', icon: '', info: '' };
          }

          return {
            type,
            name,
            icon,
            info,
          };
        })
        .filter(talent => talent.name !== '');

      tempTalents.forEach(item => talents.push(item));

      // Level Mats
      // levelMaterialTable := e.DOM.Find("table.wikitable:nth-of-type(2)")
      const constellationHeading = $(`h3 span#${alignment}_Constellation`);
      const constellationsTable = $(constellationHeading).parent().next();

      const tempConstellations = constellationsTable
        .find('tbody tr')
        .toArray()
        .map(constellation => {
          if ($(constellation).find('th').length > 0) {
            return { level: 0, name: '', effect: '' };
          }

          const level = Number(
            $(constellation)
              .find('td:nth-of-type(1)')
              .text()
              .split('\n')
              .join('')
          );
          const name = $(constellation)
            .find('td:nth-of-type(3)')
            .text()
            .replace('\n', '');
          const icon = $(constellation)
            .find('td:nth-of-type(2) a img')
            .attr('data-src');
          const effect = removeFinalSplit(
            $(constellation).find('td:nth-of-type(4)').text(),
            '.'
          );

          return {
            level,
            name,
            icon,
            effect,
          };
        })
        .filter(constellation => constellation.level !== 0);

      tempConstellations.forEach(item => constellations.push(item));

      // Ascensions // TODO
      // ascensionsTable := e.DOM.Find("table.wikitable:nth-of-type(4)")
      // Stats (dont grab this from wiki) maybe?
    }

    travelers.push({
      name,
      cardImage,
      portraitImage,
      inGameImage,
      introduction,
      personality,
      birthday,
      constellation,
      affiliation,
      dish,
      voiceEN,
      voiceCN,
      voiceJP,
      voiceKR,
      talents,
      constellations,
    });
  }

  return travelers;
};
export default traveler;
