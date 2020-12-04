import type { HttpFunction } from '@google-cloud/functions-framework/build/src/functions';
import wikiCharacterScrape from './wiki/character/scrape';

/**
 * Scrapes and returns json data to be parsed by database uploader
 *
 * @param req https://expressjs.com/en/api.html#req
 * @param res https://expressjs.com/en/api.html#res
 */
export const wiki_characters: HttpFunction = async (req, res) => {
  res.send(await wikiCharacterScrape());
};
