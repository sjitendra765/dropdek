import express from "express";
import { logger } from "../util/logger.js";
import { PeopleService } from "../services/PeopleService.js";

const peopleRoutes = express();

export default (router) => {

  // People REST API
  router.use('/people', peopleRoutes);

  peopleRoutes.get('/me', (req, res) => {
    if (req.user && req.user._id) {
      PeopleService.get(req.user)
        .then(
          (person) => {
            res.send(person);
          }
        )
        .catch((e) => logger.error(e));
    } else {
      res.sendStatus(403);
    }
  });

  peopleRoutes.put('/me', (req, res) => {
    PeopleService.update(req.user._id, req.body)
      .then((person) => {
        if (person._internal) {
          person._internal = undefined;
        }
        res.send(person);
      })
      .catch((e) => logger.error(e));
  });
};
