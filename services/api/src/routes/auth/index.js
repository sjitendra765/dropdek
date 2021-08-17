import express from "express";
import { logger } from "../../util/logger.js";
import config from "../../config.js";
import googleAuth from './google.js';
import office365Auth from './office365.js';
import localAuth from './local.js';

const logoutRoute = express.Router();

export default (router) => {
  router.use(config.frontend.authPrefix, logoutRoute);

  // Logout route
  logoutRoute.get('/logout', (req, res) => {
    logger.debug("Log out");
    req.logout();
    res.redirect(`${config.frontend.host}/start`);
  });

  // Google auth routes
  googleAuth(router);

  // Office365 auth routes
  office365Auth(router);

  // Local username and password auth routes
  if (config.auth.local.enabled) {
    localAuth(router);
  }
};
