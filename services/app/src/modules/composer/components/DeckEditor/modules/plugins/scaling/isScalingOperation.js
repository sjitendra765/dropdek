import { SCALING } from "./setScaling";

/**
 * Determines whether the given editor operations represents auto-scaling of a particular slide.
 *
 * @param op Slate editor operation.
 */
export const isScalingOperation = (op) => {
  if (!op) {
    return false;
  }
  const { path, properties, newProperties } = op;
  if (path && path.length === 1) {
    if (properties && newProperties) {
      if (properties.settings && properties.settings[SCALING]) {
        if (
          !newProperties.settings ||
          !newProperties.settings[SCALING] ||
          properties.settings[SCALING] !== newProperties.settings[SCALING]) {
          return true;
        }
      } else if (newProperties.settings && newProperties.settings[SCALING]) {
        return true;
      }
    }
  }
  return false;
};
