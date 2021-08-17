import { DeckFileService } from "../DeckFileService.js";
import { logger } from '../../../util/logger.js';
import config from '../../../config.js';

const { Storage } = require('@google-cloud/storage');

// GCS bucket
const bucket = new Storage().bucket(config.storage.cloud.google.bucketName);

/**
 * Store a file in a GCS bucket and make it public.
 *
 * @param image
 * @param pathOnDisk
 * @param resolve
 * @param reject
 */
const processFile = async (deckId, image, pathOnDisk, resolve, reject) => {
  const { filename } = image;
  const destination = `${deckId}/${filename}`;
  logger.debug(`About to upload file to ${destination} in GCS bucket ${config.storage.cloud.google.bucketName}...`);
  bucket.upload(pathOnDisk, {
    destination,
    metadata: {
      contentType: image.mimetype
    }
  }).then(async (uploadResponse) => {
    try {
      logger.debug(`Successfully uploaded file to ${destination} in GCS bucket ${config.storage.cloud.google.bucketName}`);
      // @todo delete the file on disk!
      resolve();
    } catch (e) {
      logger.error(`Error when uploading file ${filename} to GCS`);
      logger.error(e);
      reject();
    }
  });
};

/**
 * Store a new file for a given deck.
 */
exports.saveFile = (deckId, user, files, req, res) => DeckFileService.store(deckId, user, files, processFile, req, res);
