import express from "express";
import { logger } from "../util/logger.js";
import { CompanyService } from "../services/company/CompanyService.js";

const companyRoutes = express();

export default (router) => {

  // Company REST API
  router.use('/companies', companyRoutes);

  /**
   * Get company by id.
   */
  companyRoutes.get('/:_id', (req, res) => {
    CompanyService.get(req.params._id)
      .then(
        (company) => {
          res.type('application/json');
          res.send(company);
        }
      )
      .catch((e) => logger.error(e));
  });

  /**
   * Get decks for a company.
   */
  companyRoutes.get('/:_id/decks', (req, res) => {
    if (req.user.company) {
      CompanyService.getDecks(req.user.company)
        .then(
          (decks) => {
            res.type('application/json');
            res.send(decks);
          }
        )
        .catch((e) => logger.error(e));
    } else {
      res.send([]);
    }

  });

  /**
   * Create company.
   */
  companyRoutes.post('/', (req, res) => {
    CompanyService.create(req.body, req.user._id).then((company) => res.send(company));
  });

  /**
   * Update company.
   */
  companyRoutes.put('/:_id', (req, res) => {
    CompanyService.update(req.params._id, req.body).then((company) => res.send(company));
  });
};
