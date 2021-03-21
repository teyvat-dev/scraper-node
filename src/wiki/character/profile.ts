import asyncPool from 'tiny-async-pool';

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

const profile = async (links: string[]): Promise<CharacterProfilesData[]> =>
  asyncPool(10, links, async link => {
    const $ = await fetch(link);

    const name = $('h1#firstHeading').text();
    const cardImage = $('div#pi-tab-0 img.pi-image-thumbnail')
      .attr('src')
      ?.split('/revision/latest/')[0];
    const portraitImage = $('div#pi-tab-1 img.pi-image-thumbnail')
      .attr('src')
      ?.split('/revision/latest/')[0];
    const inGameImage = $('div#pi-tab-2 img.pi-image-thumbnail')
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

    const talentTable = $('table.wikitable:nth-of-type(1)');
    // TODO: Talents have their own page that can be scraped for skill attributes!
    // https://genshin-impact.fandom.com/wiki/Sharpshooter

    const talents = talentTable
      .find('tbody tr')
      .toArray()
      .map(talent => {
        // Skip if is description
        if ($(talent).find('td').attr('colspan') === '3') {
          return { type: '', name: '', icon: '', info: '' };
        }

        if (
          $(talent).find('td:nth-of-type(2)').text().replace('\n', '') ===
          'None'
        ) {
          return { type: '', name: '', icon: '', info: '' };
        }

        if ($(talent).find('td:nth-of-type(1)').toArray().length === 0) {
          return { type: '', name: '', icon: '', info: '' };
        }

        const type = $(talent)
          .find('td:nth-of-type(3)')
          .text()
          .split('-')[0]
          .replace(/\s/g, '')
          .replace(/[0-9]/g, '');
        const name = $(talent)
          .find('td:nth-of-type(2)')
          .text()
          .replace('\n', '');
        const icon = $(talent).find('td:nth-of-type(1) a img').attr('data-src');
        const info = removeFinalSplit($(talent).next().find('td').text(), '.');

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

    // Level Mats
    // levelMaterialTable := e.DOM.Find("table.wikitable:nth-of-type(2)")
    const constellationsTable = $('table.wikitable:nth-of-type(4)');
    const constellations = constellationsTable
      .find('tbody tr')
      .toArray()
      .map(constellation => {
        if ($(constellation).find('td:nth-of-type(1)').toArray().length === 0) {
          return { level: 0, name: '', effect: '' };
        }

        const level = Number(
          $(constellation).find('th:nth-of-type(1)').text().split('\n').join('')
        );
        const name = $(constellation)
          .find('td:nth-of-type(2)')
          .text()
          .replace('\n', '');
        const icon = $(constellation)
          .find('td:nth-of-type(1) a')
          .attr('data-src');
        const effect = removeFinalSplit(
          $(constellation).find('td:nth-of-type(3)').text(),
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

    // Ascensions // TODO
    // ascensionsTable := e.DOM.Find("table.wikitable:nth-of-type(4)")
    // Stats (dont grab this from wiki) maybe?

    return {
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
    };
  });

export default profile;
