import express from "express";
import expressAsyncHandler from "express-async-handler";
import { UnsplashService } from "../../../services/media/UnsplashService.js";
import { logger } from "../../../util/logger.js";
import { NLPService } from "../../../services/nlp/NLPService";
import { buildQuery } from "./queries/buildQuery";

const unsplashRoutes = express.Router();

/*
 * Only return the following fields in the payload to the client:
 * - id
 * - urls
 * - alt_description
 * - user.username
 * - user.name
 * - user.url
 * - user.profile_image
 */
const mapToImage = (img, label) => ({
  id: img.id,
  urls: img.urls,
  alt_description: img.alt_description,
  label,
  user: {
    username: img.user?.username,
    name: img.user?.name,
    url: img.user?.portfolio_url || img.user?.links.self,
    profile_image: img.user?.profile_image?.large,
  }
});

const search = (query, page, perPage, res) => {
  logger.debug(`Searching for ${query}`);
  const t0 = new Date().getTime();
  if (query !== undefined && query !== null && query.length > 0) {
    UnsplashService.search(query, page, perPage)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
      })
      .then((response) => {
        const t1 = new Date().getTime();
        logger.debug(`Searching Unsplash took ${t1 - t0} ms`);
        // Only return the following fields in the payload to the client:
        //
        // - id
        // - urls
        // - alt_description
        // - user.username
        //
        res.json(response.results.map((img) => mapToImage(img, query)));
      })
      .catch((e) => {
        logger.error(e);
      });
  }
};

export default (router) => {

  // Unsplash REST API
  router.use('/services/unsplash', unsplashRoutes);

  /**
   * Unsplash image search
   */
  unsplashRoutes.get('/search', expressAsyncHandler(async (req, res, next) => {
    const { keyword, page, perPage, rewriteQuery = false } = req.query;
    if (rewriteQuery) {
      NLPService.analyze(keyword).then((analysis) => {
        const query = buildQuery(analysis) || keyword;
        search(query, page, perPage, res);
      });
    } else {
      search(keyword, page, perPage, res);
    }

  }));

};
