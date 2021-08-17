import express from "express";
import expressAsyncHandler from "express-async-handler";
import { NLPService } from "../../services/nlp/NLPService";

export const nlpRoutes = express.Router();

export default (router) => {

  router.use('/services/nlp', nlpRoutes);

  /**
   * Extract keywords and keyphrases.
   */
  nlpRoutes.post('/keywords', expressAsyncHandler(async (req, res, next) => {
    NLPService.analyze(req.body.text)
      .then((response) => {
        res.status(200).json(response);
      });
  }));
};
