import type { RegionOutput } from './types';
import list from './list';

const scrape = async (): Promise<RegionOutput[]> => {
  // TODO Scraper source goes here
  // Generally you want to parse the list
  // const list = await list();
  await list();


  // Then parse the content per each page
  //   const regionsData = await element(
  //     list.map(region => region.link || '').filter(link => link !== '')
  //   );

  // FYI, if you find things that can be scraped but are not in the schema please make a issue for it!

  // Then combine it into one with a map or similar
  const regions: RegionOutput[] = [];

  return regions;
};

export default scrape;
