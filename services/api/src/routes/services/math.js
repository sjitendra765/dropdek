import express from "express";
import { MathJaxService } from "../../services/media/MathJaxService.js";

const mathRoutes = express.Router();

export default (router) => {

  // Math REST API
  router.use('/services/math', mathRoutes);

  /**
   * Render a MathJAX expression as an image.
   */
  mathRoutes.get('/', (req, res) => {
    MathJaxService.generate(req.query.formula,
      (data) => {
        if (!data.errors) {
          res.type('image/svg+xml');
          res.send(data.svg);
        }
      });
  });
};
