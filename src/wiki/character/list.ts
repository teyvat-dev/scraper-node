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
  let $ = await fetch(`${wikiBaseURI}/wiki/Characters/List#`);

  if (!$) {
    return [];
  }

  let rows = $('.article-table tbody tr').toArray();

  const charTableData: CharacterTableData[] = [];

  rows.forEach((char, i) => {
    const name = $(char).find('td:nth-child(3) a').text();
    if (!name) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      rows[i] = null;
      return;
    }

    let link = $(char).find('td:nth-child(3) a').attr('href');
    link = link ? `${wikiBaseURI}${link}` : '';

    charTableData.push({
      rarity: Number($(char).find('td:nth-child(1)').text()),
      image: $(char).find('td:nth-child(2) a').attr('href'),
      name: name,
      element: $(char).find('td:nth-child(4) a:last-of-type').text(),
      weapon: $(char).find('td:nth-child(5) a:last-of-type').text(),
      sex: $(char).find('td:nth-child(6)').text(),
      nation: $(char).find('td:nth-child(7) a:first-of-type').text(),
      link: link,
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    rows[i] = null; // Remove Element from memory
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  $ = null; // Clear root from memory
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  rows = null;

  const copied = JSON.parse(JSON.stringify(charTableData));

  return copied;
};

export default list;
