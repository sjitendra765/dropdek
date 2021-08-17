import express from "express";
import auth from './auth/index.js';
import deck from './deck/index.js';
import people from "./people.js";
import company from "./company.js";
import config from "../config.js";
import media from "./services/media.js";
import math from "./services/math.js";
import unsplash from "./services/unsplash/unsplash.js";
import giphy from "./services/giphy.js";
import branding from "./services/branding.js";
import files from "./deck/files.js";
import exports from "./exports.js";
import datasource from "./datasource/datasource.js";
import nlp from "./services/NLP.js";
import links from "./services/scrape.js";

export default () => {
  const router = express.Router();

  // Core routes
  if (config.routes.auth) auth(router);
  if (config.routes.deck) {
    deck(router);
    files(router);
  }
  if (config.routes.people) people(router);
  if (config.routes.company) company(router);
  if (config.routes.datasources) datasource(router);

  // Services
  if (config.routes.services.media) media(router);
  if (config.routes.services.math) math(router);
  if (config.routes.services.unsplash) unsplash(router);
  if (config.routes.services.giphy) giphy(router);
  if (config.routes.services.branding) branding(router);
  if (config.routes.services.export) exports(router);
  if (config.routes.services.nlp) nlp(router);
  if (config.routes.services.links) links(router);

  return router;
};
