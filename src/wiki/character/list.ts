import type { CharacterTableData } from './types';
import { wikiBaseURI } from '../../constants';
import { fetch } from '../../helpers/fetch';

const list = async (): Promise<CharacterTableData[]> => {
  const $ = await fetch(`${wikiBaseURI}/wiki/Characters/Playable`);

  const charTableData: CharacterTableData[] = $('.article-table tbody tr')
    .toArray()
    .filter(char => $(char).find('td:nth-child(2) a').text())
    .map(char => {
      let link = $(char).find('td:nth-child(2) a').attr('href');
      link = link ? `${wikiBaseURI}${link}` : '';

      return {
        rarity: Number($(char).find('td:nth-child(3)').text()),
        image: $(char).find('td:nth-child(1) a').attr('href'),
        name: $(char).find('td:nth-child(2) a').text(),
        element:
          $(char).find('td:nth-child(4) a:last-of-type').text() ||
          $(char).find('td:nth-child(4) p').text().replace('\n', ''),
        weapon: $(char).find('td:nth-child(5) a:last-of-type').text(),
        sex: $(char).find('td:nth-child(6)').text(),
        nation: $(char).find('td:nth-child(7) a:first-of-type').text(),
        link: link,
      };
    });

  const tempAlbedo: CharacterTableData = {
    rarity: 5,
    image:
      'https://static.wikia.nocookie.net/gensin-impact/images/0/00/Character_Albedo_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201217053650',
    name: 'Albedo',
    element: 'Geo',
    weapon: 'Sword',
    sex: 'Male',
    nation: 'Mondstadt',
    link: `${wikiBaseURI}/wiki/Albedo`,
  };

  return [tempAlbedo, ...charTableData];
};

export default list;
