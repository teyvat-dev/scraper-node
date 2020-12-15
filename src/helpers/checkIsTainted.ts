import type { File } from '@google-cloud/storage';
import md5 from 'crypto-md5';

const checkIsTainted = async (file: File, data: String) => {
  try {
    const metadata = await file.getMetadata();

    if (metadata[0].md5Hash === md5(data, 'base64')) {
      return false;
    }
    return true;
  } catch {
    return true;
  }
};

export default checkIsTainted;
