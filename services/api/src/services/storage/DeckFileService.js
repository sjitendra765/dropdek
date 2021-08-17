import sizeOf from "image-size";
import { Deck, File } from '@dropdeck/schema';
import { writableBy } from "../deck/queries/writableBy.js";
import ImageColors, { legacyMapper } from "../../util/color/ImageColors.js";
import { logger } from '../../util/logger.js';
import config from "../../config.js";

const storeFile = (image, deckId, user, payload, next) => async () => {
  const { originalname, filename, mimetype, path } = image;
  const palette = await legacyMapper(ImageColors.from(path));
  const { width, height } = sizeOf(path);

  File.create({
    filename: originalname,
    name: filename,
    from: 'upload',
    mimetype,
    width,
    height,
    swatch: palette,
    owner: user ? user._id : null,
    deck: deckId,
    company: user ? user.company : null,
  });

  payload.push({
    name: filename,
    from: 'upload',
    swatch: palette
  });

  next(); // resolve the promise
};

export const DeckFileService = {

  storageFolder: (deckId, generated = false) => `${config.storage.disk.path}/${deckId}${generated ? '/generated' : ''}`,

  storagePath: (deckId, filename) => `${config.storage.disk.path}/${deckId}/${filename}`,

  store: (deckId, user, files, processFile, req, res) => {

    // Verify that the user has rights to add files to this deck.
    Deck.findOne({
      $and: [{ _id: deckId }, writableBy(req, res)]
    })
      .exec(null)
      .then(
        async (deck) => {
          if (deck) {

            let promises = [];
            const payload = [];
            files.forEach((image) => {
              const promise = new Promise((resolve, reject) => {
                processFile(deckId, image, DeckFileService.storagePath(deckId, image.filename), storeFile(image, deckId, user, payload, resolve), reject);
              });
              promises.push(promise);
            });

            Promise.all(promises)
              .then(() => {
                logger.debug(`All promises completed`);
                promises = [];
                res.json(payload);
              })
              .catch((e) => {
                logger.error(`Error when storing images`);
                logger.error(e);
              });

          } else {
            logger.error(`Unauthorized access when user ${req.user ? req.user.email : null} attempted to add files to deck ${deckId}`);
            res.status(404);
            res.send();
          }
        }
      )
      .catch((e) => {
        logger.error(`Error when user ${req.user ? req.user.email : null} attempted to add files to deck ${deckId}`);
        logger.error(e);
        res.status(500);
        res.send();
      });

  }
};
