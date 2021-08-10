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

  let list = await asyncPool(10, charTableDataRaw, async char => {
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

  // Patch: Add Yoimiya
  const yoimiya = {
    rarity: 5,
    image:
      'https://static.wikia.nocookie.net/gensin-impact/images/0/05/Character_Yoimiya_Thumb.png',
    name: 'Yoimiya',
    element: 'Pyro',
    weapon: 'Bow',
    sex: 'Female',
    nation: 'Inazuma',
    link: `${wikiBaseURI}/wiki/Yoimiya`,
  };

  // Patch: Add Sayu
  const sayu = {
    rarity: 4,
    image:
      'https://static.wikia.nocookie.net/gensin-impact/images/e/ec/Character_Sayu_Thumb.png',
    name: 'Sayu',
    element: 'Anemo',
    weapon: 'Claymore',
    sex: 'Female',
    nation: 'Inazuma',
    link: `${wikiBaseURI}/wiki/Sayu`,
  };

  if (list.findIndex(item => item.link.includes('Yoimiya')) === -1) {
    list = [...list, yoimiya];
  }

  if (list.findIndex(item => item.link.includes('Sayu')) === -1) {
    list = [...list, sayu];
  }

  return list;
};

export default list;
