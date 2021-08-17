import { SlideTransforms } from "../../../services/transforms/SlideTransforms";
import { SCALING } from "./setScaling";
import { logger } from "../../../../../../../common/util/logger";

/**
 * Reset scaling for all slide elements (e.g. when theme changes).
 *
 * @param editor deck editor.
 * @param content content state of the editor.
 */
export const resetScaling = (editor, nodes) => {
  logger.debug(`Resetting scaling for all slides in a deck`);
  if (nodes && Array.isArray(nodes)) {
    nodes.forEach((node, i) => {
      if (SlideTransforms.isSlide(node)) {
        const path = [i];
        editor.settings(path).remove(SCALING);
      }
    });
  }
};
