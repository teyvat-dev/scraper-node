import type { HttpFunction } from '@google-cloud/functions-framework/build/src/functions';
import { Storage } from '@google-cloud/storage';

import handleWikiCharacters from './wiki/character/handle';
import handleWikiElements from './wiki/element/handle';
import handleWikiRegions from './wiki/region/handle';

const storage = new Storage();

/**
 * Scrapes and returns wiki characters json data to be parsed by database uploader
 *
 * @param req https://expressjs.com/en/api.html#req
 * @param res https://expressjs.com/en/api.html#res
 */
export const wiki_characters: HttpFunction = async (req, res) => {
  await handleWikiCharacters(res, storage);
};

/**
 * Scrapes and returns wiki elements json data to be parsed by database uploader
 *
 * @param req https://expressjs.com/en/api.html#req
 * @param res https://expressjs.com/en/api.html#res
 */
export const wiki_elements: HttpFunction = async (req, res) => {
  await handleWikiElements(res, storage);
};

/**
 * Scrapes and returns wiki regions json data to be parsed by database uploader
 *
 * @param req https://expressjs.com/en/api.html#req
 * @param res https://expressjs.com/en/api.html#res
 */
export const wiki_regions: HttpFunction = async (req, res) => {
  await handleWikiRegions(res, storage);
};
