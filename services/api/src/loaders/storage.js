import mkdirp from "mkdirp";
import config from "../config.js";

/**
 * Load configuration for the data storage.
 *
 * @param app Express app server.
 */
export default (app) => {
  mkdirp.sync(config.storage.disk.path);
};
