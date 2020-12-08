import { wikiBaseURI } from '../../constants';
import { fetch } from '../../helpers/fetch';

interface CharacterTableData {
  rarity: number;
  image?: string;
  name: string;
  element: string;
  weapon: string;
  sex: string;
  nation: string;
  link?: string;
}

const list = async (): Promise<CharacterTableData[]> => {
  const $ = await fetch(`${wikiBaseURI}/wiki/Characters/List#`);

  const charTableData: CharacterTableData[] = $('.article-table tbody tr')
    .toArray()
    .filter(char => $(char).find('td:nth-child(3) a').text())
    .map(char => {
      let link = $(char).find('td:nth-child(3) a').attr('href');
      link = link ? `${wikiBaseURI}${link}` : '';

      return {
        rarity: Number($(char).find('td:nth-child(1)').text()),
        image: $(char).find('td:nth-child(2) a').attr('href'),
        name: $(char).find('td:nth-child(3) a').text(),
        element: $(char).find('td:nth-child(4) a:last-of-type').text(),
        weapon: $(char).find('td:nth-child(5) a:last-of-type').text(),
        sex: $(char).find('td:nth-child(6)').text(),
        nation: $(char).find('td:nth-child(7) a:first-of-type').text(),
        link: link,
      };
    });

  return charTableData;
};

export default list;
