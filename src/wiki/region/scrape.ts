import type { RegionOutput } from './types';
import list from './list';

const scrape = async (): Promise<RegionOutput[]> => {
  const tables = await list();

  // Then combine it into one with a map or similar
  const regions: RegionOutput[] = tables.map(region => ({
    name: region.nation,
    // element: region.element
    // archon: region.archon;
    // ideal: region.ideal;
    // governingBody: region.governingBody;
  }));

  return regions;
};

export default scrape;
