import type { ElementOutput } from './types';
import list from './list';

const scrape = async (): Promise<ElementOutput[]> => {
  const table = await list();

  // Then combine it into one with a map or similar
  const elements: ElementOutput[] = table.map(element => ({
    name: element.name,
    statusEffect: element.statusEffect,
  }));

  return elements;
};

export default scrape;
