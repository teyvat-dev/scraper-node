import asyncPool from 'tiny-async-pool';

import type { CharacterTableData } from './types';
import { wikiBaseURI } from '../../constants';
import { fetch } from '../../helpers/fetch';
import { Element, WeaponType } from '@teyvatdev/types/dist/types/client';

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

  const hutao = {
    name: 'Hu Tao',
    rarity: 5,
    image:
      'https://static.wikia.nocookie.net/gensin-impact/images/a/a4/Character_Hu_Tao_Thumb.png',
    element: 'Pyro',
    weapon: 'Polearm' as WeaponType,
    sex: 'female',
    nation: 'Liyue',
    link: `https://genshin-impact.fandom.com/wiki/Hu_Tao`,
  };

  return [...list, hutao];
};

export default list;
