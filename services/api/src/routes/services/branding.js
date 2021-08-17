import express from "express";
import expressAsyncHandler from "express-async-handler";
import { BrandingService } from "../../services/branding/BrandingService.js";
import { logger } from "../../util/logger.js";

const brandingServiceRoutes = express.Router();
const brandingRoutes = express.Router();

export default (router) => {

  // Branding REST API
  router.use('/branding', brandingRoutes);

  brandingRoutes.get('/:_id?', (req, res) => {
    BrandingService.get(req.params._id)
      .then(
        (branding) => {
          res.type('application/json');
          res.send(branding);
        }
      ).catch((e) => logger.error(e));
  });

  brandingRoutes.put('/:_id', (req, res) => {
    BrandingService.update(req.params._id, req.body)
      .then((branding) => res.send(branding));
  });

  // Branding services REST API
  router.use('/services/branding', brandingServiceRoutes);

  /**
   * Get information about a given domain. If already exists and augmented by Brandfetch we return
   * from database. If just exists as domain but not augmented we harvest all details.
   */
  brandingServiceRoutes.get('/company/:domain', expressAsyncHandler(async (req, res, next) => {
    const { domain } = req.params;
    if (domain !== undefined && domain !== null && domain.length > 0) {
      const branding = await BrandingService.harvestBranding(domain);
      logger.debug("Branding service completed request");
      res.send(branding);
    } else {
      res.status(500);
      res.send("Parameter `domain` not specified");
    }
  }));

  brandingServiceRoutes.get('/logo/:domain', expressAsyncHandler(async (req, res) => {
    const { domain } = req.params;
    if (domain !== undefined && domain !== null && domain.length > 0) {
      BrandingService.harvestLogo(domain, res);
    }
  }));
};
