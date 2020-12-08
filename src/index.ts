import type { HttpFunction } from '@google-cloud/functions-framework/build/src/functions';
import { Storage } from '@google-cloud/storage';
import md5 from 'crypto-md5';

import { __DEV__ } from './constants';
import wikiCharacterScrape from './wiki/character/scrape';

const storage = new Storage();

/**
 * Scrapes and returns json data to be parsed by database uploader
 *
 * @param req https://expressjs.com/en/api.html#req
 * @param res https://expressjs.com/en/api.html#res
 */
export const wiki_characters: HttpFunction = async (req, res) => {
  const characters = await wikiCharacterScrape();

  if (__DEV__) {
    return res.send(characters);
  }

  if (!process.env.SCRAPER_BUCKET) {
    return res.send({ error: 'SCRAPER_BUCKET env variable is missing' });
  }

  const bucket = storage.bucket(process.env.SCRAPER_BUCKET);

  await Promise.all(
    characters.map(async character => {
      const data = JSON.stringify(character); // TODO change this all to gzip?

      const file = bucket.file(`wiki_characters/${character.character.name}`);

      const metadata = await file.getMetadata();

      if (metadata[0].md5Hash === md5(data, 'base64')) {
        return;
      }

      const fileStream = file.createWriteStream({
        resumable: false,
        contentType: 'application/json',
      });

      fileStream.on('error', err => {
        return res.status(500).send({ error: err });
      });

      fileStream.on('finish', () => {
        return;
      });

      fileStream.end(data);
    })
  );

  return res.send({ status: 'Done' });
};
