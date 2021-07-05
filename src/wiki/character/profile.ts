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

    const name = $('h1.page-header__title').text().trim();
    const piImageCollection = $(
      'div.pi-image-collection .wds-tab__content'
    ).toArray();

    const cardImage = $(piImageCollection[0])
      .find('img.pi-image-thumbnail')
      .attr('src')
      ?.split('/revision/latest/')[0];
    const portraitImage = $(piImageCollection[1])
      .find('img.pi-image-thumbnail')
      .attr('src')
      ?.split('/revision/latest/')[0];
    const inGameImage = $(piImageCollection[2])
      .find('img.pi-image-thumbnail')
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

    // const bio = $('div.pi-section-content[data-ref="0"]');
    const birthday = $('div.pi-item[data-source="birthday"] div').text();
    const constellation = $(
      'div.pi-item[data-source="constellation"] div'
    ).text();
    const affiliation = $('div.pi-item[data-source="affiliation"] div').text();
    const dish = $('div.pi-item[data-source="dish"] div').text();

    // const voiceActors = $('div.pi-section-content[data-ref="1"]');
    const voiceEN = $('div.pi-item[data-source="voiceEN"] div').text();
    const voiceCN = $('div.pi-item[data-source="voiceCN"] div').text();
    const voiceJP = $('div.pi-item[data-source="voiceJP"] div').text();
    const voiceKR = $('div.pi-item[data-source="voiceKR"] div').text();

    const talentHeading = $('h3 span#Talents');
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

    const talents = talentPairs
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
        const info = removeFinalSplit($(talentPair[1]).find('td').text(), '.');

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
    const constellationHeading = $('h3 span#Constellation');
    const constellationsTable = $(constellationHeading).parent().next();

    const constellations = constellationsTable
      .find('tbody tr')
      .toArray()
      .map(constellation => {
        if ($(constellation).find('th').length > 0) {
          return { level: 0, name: '', effect: '' };
        }

        const level = Number(
          $(constellation).find('td:nth-of-type(1)').text().split('\n').join('')
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
