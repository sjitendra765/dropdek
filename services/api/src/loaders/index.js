import mongooseLoader from './mongoose.js';
import expressLoader from './express.js';
import googleAuthLoader from './auth/google.js';
import localAuthLoader from './auth/local.js';
import office365AuthLoader from './auth/office365.js';
import storageLoader from './storage.js';
import unsplashLoader from './services/unsplash.js';
import brandingLoader from './services/branding';
import giphyLoader from './services/giphy.js';

import { logger } from "../util/logger.js";
import config from "../config.js";

const load = async (app) => {

  mongooseLoader();
  logger.info('Database loaded and connected  ✌️');

  googleAuthLoader(app);
  logger.info('Google authentication is ready  ✌️');

  if (config.auth.local.enabled) {
    localAuthLoader(app);
    logger.info('Local-simulation authentication is ENABLED ✌️');
    logger.warn('Note: This should never be used in production!️');
  } else {
    logger.info('Local-simulation authentication is DISABLED️');
  }

  office365AuthLoader(app);
  logger.info('Office365 authentication is ready  ✌️');

  expressLoader(app);
  logger.info('Express server is ready  ✌️');

  storageLoader(app);
  logger.info('Disk storage is ready  ✌️');

  unsplashLoader(app);
  logger.info('Unsplash service is ready  ✌️');

  brandingLoader(app);
  logger.info('Branding service is ready  ✌️');

  giphyLoader(app);
  logger.info('Giphy service is ready  ✌️');
};

export default load;
