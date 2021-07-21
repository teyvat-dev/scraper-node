import asyncPool from 'tiny-async-pool';

import type { CharacterTableData } from './types';
import { wikiBaseURI } from '../../constants';
import { fetch } from '../../helpers/fetch';

const list = async (): Promise<CharacterTableData[]> => {
  const $ = await fetch(`${wikiBaseURI}/wiki/Characters`);

  const charTableDataRaw = $('.article-table')
    .first()
    .find('tbody tr')
    .toArray()
    .filter(char => $(char).find('td:nth-child(2) a').text());

  const list = await asyncPool(10, charTableDataRaw, async char => {
    const name = $(char).find('td:nth-child(2) a').text();
    let link = $(char).find('td:nth-child(2) a').attr('href');
    link = link ? `${wikiBaseURI}${link}` : '';

    return {
      rarity: Number(
        $(char).find('td:nth-child(3) img').attr('alt')?.split(' ')[0]
      ),
      image: $(char)
        .find('td:nth-child(1) img')
        .attr('data-src')
        ?.split('/revision/latest/')[0],
      name,
      element:
        $(char).find('td:nth-child(4) a:last-of-type').text() ||
        $(char).find('td:nth-child(4) p').text().replace('\n', ''),
      weapon: $(char).find('td:nth-child(5) a:last-of-type').text(),
      sex: $(char).find('td:nth-child(6)').text(),
      nation: $(char).find('td:nth-child(7) a:first-of-type').text(),
      link: link,
    };
  });

  // Patch: Add Ayaka
  const ayaka = {
    rarity: 5,
    image:
      'https://static.wikia.nocookie.net/gensin-impact/images/f/f4/Character_Ayaka_Thumb.png',
    name: 'Kamisato Ayaka',
    element: 'Cryo',
    weapon: 'Sword',
    sex: 'Female',
    nation: 'Inazuma',
    link: `${wikiBaseURI}/wiki/Kamisato_Ayaka`,
  };

  // If ayaka is not in the list append her
  if (list.findIndex(item => item.link.includes('Kamisato_Ayaka')) === -1) {
    return [...list, ayaka];
  }

  return list;
};

export default list;
