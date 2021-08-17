import { Deck } from '@dropdeck/schema';
import { accessibleBy } from "./queries/accessibleBy.js";
import { ownedBy } from "./queries/ownedBy.js";
import { sharedWith } from "./queries/sharedWith.js";
import { hasBeenUpdated } from "./queries/hasBeenUpdated.js";
import { defaultPermissions } from "./queries/defaultPermissions.js";
import { writableBy } from "./queries/writableBy.js";
import { deletableBy } from "./queries/deletableBy.js";
import { debugMode } from "../../util/debugMode";
import { logger } from "../../util/logger";

const LIMIT = 8;

export const DeckService = {

  /**
   * Get all decks that a user can access. These can be restricted further to passing in "owner" (Boolean)
   * to filter on decks owned by the user, or just shared with the user.
   *
   * @param query optional deck query.
   * @param req HTTP request.
   * @param res HTTP response.
   * @returns a Promise for the deck response.
   */
  find: (query, req, res) => {
    let clause = accessibleBy(req, res);
    const { f } = req.query;
    if (f !== undefined) {
      if (f === 'owner') {
        clause = ownedBy(req.user);
      } else if (f === 'shared') {
        clause = sharedWith(req.user);
      }
    }

    // Only return documents that have been updated:
    const combinedClause = { $and: [clause, hasBeenUpdated()] };

    return Deck.find(combinedClause)
      .sort("-updated")
      .limit(LIMIT * parseInt(req.query.page, 10))
      .populate("owner")
      .select("-_internal") // don't return _internal metadata to the client
      .exec(null);
  },

  /**
   * Fetch a single deck by ID.
   *
   * @param req HTTP request.
   * @param res HTTP response.
   * @returns a Promise for the deck response.
   */
  get: (id, req, res) => (
    Deck.findOne({
      $and: [{ _id: id }, accessibleBy(req, res)]
    })
      .populate("owner")
      .select("-_internal") // don't return _internal metadata to the client
      .exec(null)),

  /**
   * Create a new deck.
   *
   * @param deckObject new deck object.
   * @param user current user
   * @returns a Promise for the deck response.
   */
  create: (deckObject, user) => {
    const newDeck = {
      ...deckObject,
      owner: user ? user._id : null,
      company: user && user.company !== undefined ? user.company : null
    };
    if (!newDeck.permissions) {
      newDeck.permissions = defaultPermissions(user);
    }
    return Deck.create(newDeck);
  },

  /**
   * Update a deck.
   *
   * @param id deck ID.
   * @param deckObject new deck data.
   * @param req HTTP request.
   * @param res HTTP response.
   */
  update: (id, deckObject, req, res, callback) => {
    if (debugMode()) {
      const used = process.memoryUsage().heapUsed / 1024 / 1024;
      logger.debug(`The API is using ~${Math.round(used * 100) / 100} MB`);
    }
    Deck.findOneAndUpdate({ $and: [{ _id: id }, writableBy(req, res)] },
      { $set: { ...deckObject } }, {
        new: true,
        projection: { counter: 0 }, // don't return _internal metadata to the client
      }, callback);
  },

  /**
   * Delete a particular deck.
   *
   * @param id deck ID.
   * @param req HTTP request.
   * @param res HTTP response.
   */
  delete: (id, req, res, callback) => {
    Deck.findOneAndDelete({ $and: [{ _id: id }, deletableBy(req, res)] }, callback);
  }

};
