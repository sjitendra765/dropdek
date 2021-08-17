import express from "express";
import expressAsyncHandler from "express-async-handler";
import { createProxyMiddleware } from 'http-proxy-middleware';
import multer from "multer";
import shortid from "shortid";
import mkdirp from "mkdirp";
import config from '../../config.js';
import { logger } from '../../util/logger.js';
import { DeckFileService } from "../../services/storage/DeckFileService.js";

// Multer is required to process file uploads and make them available via the HTTP request.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { deckId } = req.params;
    const folder = DeckFileService.storageFolder(deckId);
    mkdirp.sync(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const suffix = file.originalname.split('.').pop();
    const id = `img-${shortid.generate()}`;
    cb(null, `${id}.${suffix}`);
  }
});

const { saveFile } = config.storage.cloud.google.enabled ?
  require('../../services/storage/cloud/google') :
  require('../../services/storage/disk');

const deckFileRoutes = express.Router();

export default (router) => {

  // Deck files REST API
  router.use('/decks', deckFileRoutes);

  const upload = multer({ storage });

  /**
   * Upload one or more files for a given deck.
   */
  deckFileRoutes.post('/:deckId/files', upload.array("files", 12), expressAsyncHandler(async (req, res, next) => {
    const { deckId } = req.params;
    saveFile(deckId, req.user, req.files, req, res);
  }));

  /**
   * Routes to serve up static assets.
   */

  // Proxy file uploads...
  if (config.storage.cloud.google.enabled) {

    // ... to Google Cloud Storage:
    router.use('/assets', createProxyMiddleware({
      target: `${config.storage.cloud.google.proxyUrl}`,
      changeOrigin: true,
      pathRewrite: {
        '^/assets/': '',
      }
    }));
    logger.debug(`Serving up files from Google Cloud Storage: Proxying /assets/* => ${config.storage.cloud.google.proxyUrl}/*`);

  } else {

    // ... or to a persistent disk volume:
    router.use('/assets', express.static(config.storage.disk.path));
    logger.debug(`Serving up files from local disk: Proxying /assets/* => ${config.storage.disk.path}/*`);
  }
};
