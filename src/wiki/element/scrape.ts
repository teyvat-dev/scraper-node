import type { ElementOutput } from './types';
import list from './list';

const scrape = async (): Promise<ElementOutput[]> => {
  // TODO Scraper source goes here
  // Generally you want to parse the list
  // const list = await list();
  const table = await list();

  // Then parse the content per each page
  //   const elements = await element(
  //     list.map(element => element.link || '').filter(link => link !== '')
  //   );

  // FYI, if you find things that can be scraped but are not in the schema please make a issue for it!

  // Then combine it into one with a map or similar
  const elements: ElementOutput[] = [];

  return elements;
};

export default scrape;
