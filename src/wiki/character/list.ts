import type { Storage } from '@google-cloud/storage';
import asyncPool from 'tiny-async-pool';

import type { CharacterTableData } from './types';
import { wikiBaseURI } from '../../constants';
import { fetch } from '../../helpers/fetch';
import copyImage from '../../helpers/copyImage';

const list = async (storage: Storage): Promise<CharacterTableData[]> => {
  const $ = await fetch(`${wikiBaseURI}/wiki/Characters`);

  const charTableDataRaw = $('.article-table')
    .first()
    .find('tbody tr')
    .toArray()
    .filter(char => $(char).find('td:nth-child(2) a').text());

  return await asyncPool(10, charTableDataRaw, async char => {
    const name = $(char).find('td:nth-child(2) a').text();
    let link = $(char).find('td:nth-child(2) a').attr('href');
    link = link ? `${wikiBaseURI}${link}` : '';

    return {
      rarity: Number(
        $(char).find('td:nth-child(3) img').attr('alt')?.split(' ')[0]
      ),
      image: await copyImage(
        storage,
        `characters/${name}/icon`,
        $(char)
          .find('td:nth-child(1) img')
          .attr('data-src')
          ?.split('/revision/latest/')[0]
      ),
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
};

export default list;
