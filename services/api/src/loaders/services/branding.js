import mkdirp from "mkdirp";
import config from "../../config.js";

/**
 * Load configuration for the Branding service.
 *
 * @param app Express app server.
 */
export default (app) => {
  mkdirp.sync(config.services.brandfetch.tempDirectory);
};
