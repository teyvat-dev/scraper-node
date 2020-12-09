import type { Response } from 'express';
import type { Storage } from '@google-cloud/storage';
import md5 from 'crypto-md5';

import scrape from './scrape';
import { __DEV__ } from '../../constants';

const handle = async (res: Response, storage: Storage) => {
  const regions = await scrape();

  if (__DEV__) {
    return res.send(regions);
  }

  if (!process.env.SCRAPER_BUCKET) {
    return res.send({ error: 'SCRAPER_BUCKET env variable is missing' });
  }

  const bucket = storage.bucket(process.env.SCRAPER_BUCKET);

  // TODO this needs to be updated to support the ouput of regions
  // use `wiki_regions/<region name>` as the file name

  // await Promise.all(
  //   characters.map(async character => {
  //     const data = JSON.stringify(character); // TODO change this all to gzip?

  //     const file = bucket.file(`wiki_characters/${character.character.name}`);

  //     const metadata = await file.getMetadata();

  //     if (metadata[0].md5Hash === md5(data, 'base64')) {
  //       return;
  //     }

  //     const fileStream = file.createWriteStream({
  //       resumable: false,
  //       contentType: 'application/json',
  //     });

  //     fileStream.on('error', err => {
  //       return res.status(500).send({ error: err });
  //     });

  //     fileStream.on('finish', () => {
  //       return;
  //     });

  //     fileStream.end(data);
  //   })
  // );

  return res.send({ status: 'Done' });
};

export default handle;
