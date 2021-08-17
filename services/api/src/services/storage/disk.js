import { DeckFileService } from "./DeckFileService.js";

const processFile = (deckId, image, pathOnDisk, resolve, reject) => resolve();

/**
 * Store a new file for a given deck.
 */
exports.saveFile = (deckId, user, files, req, res) => DeckFileService.store(deckId, user, files, processFile, req, res);
