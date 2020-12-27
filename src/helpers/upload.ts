import type { Storage } from '@google-cloud/storage';
import checkIsTainted from './checkIsTainted';

/**
 * Upload a item to a bucket and checks if tainted before doing so
 *
 * @param storage GCS Instance
 * @param bucketRef Name of the bucket to upload to
 * @param data Source data
 * @param path Custom path reference for the storage object
 *
 */
const upload = async (
  storage: Storage,
  data: string | Buffer,
  path: string,
  mimeType: string,
  bucketRef?: string
): Promise<string> =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    if (!bucketRef) {
      return reject(new Error('Bucket ref variable is missing'));
    }

    const bucket = storage.bucket(bucketRef);

    const file = bucket.file(path);

    const isTainted = await checkIsTainted(file, data);

    if (!isTainted) {
      return resolve(`${bucketRef}/${path}`);
    }

    const fileStream = file.createWriteStream({
      resumable: false,
      contentType: mimeType,
    });

    fileStream.on('error', err => {
      console.error(err);
      return reject(new Error(err.message));
    });

    fileStream.on('finish', () => {
      return resolve(`${bucketRef}/${path}`);
    });

    fileStream.end(data);
  });

export default upload;
