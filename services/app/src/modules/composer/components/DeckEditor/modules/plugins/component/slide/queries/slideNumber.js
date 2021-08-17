/**
 * Returns the ordinal of the slide identified by the given path, taking into account that
 * there is a slide break element in between any two subsequent slides.
 *
 * @param path slide path.
 * @returns {number} slide number (ordinal).
 */
export const slideNumber = (path) => (path.length > 0 ? path[0] / 2 + 1 : 0);
