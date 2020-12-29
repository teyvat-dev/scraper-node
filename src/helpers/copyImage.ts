import type { Storage } from '@google-cloud/storage';
import fetch from 'node-fetch';

import { __DEV__ } from '../constants';
import upload from './upload';

/**
 * Copies image to resources bucket and returns the new resource URL
 * If in development mode the resource will not be uploaded and the original url will be returned
 *
 * @param storage GCS Instance
 * @param url Source URL to copy image/file from
 * @param path Custom path reference for the storage object
 *
 */
const copyImage = async (
  storage: Storage,
  path: string,
  url?: string
): Promise<string> => {
  if (!url) {
    return '';
  }

  if (__DEV__) {
    return url;
  }

  const fetchData = await fetch(url);

  const data = await fetchData.buffer();

  const contentType = fetchData.headers.get('Content-Type') || 'image/png';

  return await upload(
    storage,
    data,
    `${path}.${contentType.split('/')[1]}`,
    contentType,
    process.env.RESOURCES_BUCKET
  );
};

export default copyImage;
