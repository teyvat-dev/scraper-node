import type { Response } from 'express';
import type { Storage } from '@google-cloud/storage';

import scrape from './scrape';
import { __DEV__ } from '../../constants';
import upload from '../../helpers/upload';

const handle = async (res: Response, storage: Storage) => {
  const characters = await scrape();

  if (__DEV__) {
    return res.send(characters);
  }

  await Promise.all(
    characters.map(async character =>
      upload(
        storage,
        JSON.stringify(character) /* TODO change this all to gzip? */,
        `wiki_characters/${character.character.name}`,
        'application/json',
        process.env.SCRAPER_BUCKET
      )
    )
  );

  return res.send({ status: 'Done' });
};

export default handle;
