import express from "express";
import passport from "passport";
import config from "../../config.js";
import { STRATEGY_LOCAL } from "../../loaders/auth/local";
import { AuthService } from "../../services/auth/AuthService";

const authRoutes = express.Router();

/**
 * Local user name and password authentication routes.
 *
 * @param router Express Router.
 */
export default (router) => {

  router.use(config.frontend.authPrefix, authRoutes);

  authRoutes.post('/login', (req, res) => {
    passport.authenticate(STRATEGY_LOCAL, {
      response: res,
      successRedirect: `${config.frontend.host}${config.frontend.signupModule}`,
      failureRedirect: `${config.frontend.host}${config.auth.local.failedPage}`,
    })(req, res);
  });
};
