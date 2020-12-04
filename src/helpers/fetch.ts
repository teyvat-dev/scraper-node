import fetcher from 'node-fetch';
import cheerio from 'cheerio';

const fetch = async (url: string) =>
  cheerio.load(await (await fetcher(url)).text());

export { fetch };
