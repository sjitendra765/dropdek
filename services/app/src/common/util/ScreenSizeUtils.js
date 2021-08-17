/**
 * Check whether height or width limits viewable area for a given aspect ratio.
 *
 * @param width
 * @param height
 * @param aspect
 */
import { ASPECT_RATIOS, DEFAULT_ASPECT_RATIO } from "../model/Deck";

export const calculateSlideSize = (width, height, aspect = DEFAULT_ASPECT_RATIO) => {
  const ratio = ASPECT_RATIOS[aspect];

  const widthForHeight = Math.floor(height * ratio);
  const heightForWidth = Math.floor(width / ratio);

  if (height > 0 && heightForWidth > height) {
    return { width: widthForHeight, height, aspect };
  }

  return { width, height: heightForWidth, aspect };
};
