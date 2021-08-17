import { getOverflowScaling } from "./getOverflowScaling";
import { fontSizeFromWidth } from "./fontSizeFromWidth";
import { MIN_SCALING } from "../../../../Slide/scalingLimits";
import { logger } from "../../../../../../../common/util/logger";

export const calculateScaling = (
  slide,
  needsCalculating,
  setNeedsCalculating,
  fontScaling,
  setFontScaling,
  lastModified,
  setLastModified,
  width,
  fontSize,
  setFontSize,
  getSize,
  updateSlideSettings
) => (element) => {
  if (element) {
    const { timeStamp } = slide;
    const currentFontScaling = fontScaling;

    logger.trace(`Slide ${slide.id}: Current font scaling is ${currentFontScaling} and ${needsCalculating ? 'needs calculating' : 'does not need calculating'}`);

    // If the slide has been modified then we wait for the scaling to be reset before measuring.
    if (needsCalculating) {

      const scalingFactor = getOverflowScaling(element, getSize);
      logger.trace(`Scaling factor: ${scalingFactor}`);
      if (scalingFactor !== undefined && scalingFactor < 1) {
        const atLowerBound = fontScaling === MIN_SCALING && scalingFactor < 1;

        // If we have reached the lower bound of scaling, and we are expected to further
        // downscale, then we don't continue further.
        if (!atLowerBound) {
          let newScaling = Math.floor(10 * currentFontScaling * scalingFactor) / 10;
          if (newScaling < MIN_SCALING) {
            newScaling = MIN_SCALING;
            logger.trace(`Slide ${slide.id}: Reached the end of downscaling - the slide has unavoidable overflow`);
          }

          if (newScaling !== fontScaling) {
            logger.trace(`Slide ${slide.id}: New font scaling: ${newScaling}, was ${fontScaling}`);
            setFontScaling(newScaling);
            setLastModified(timeStamp);
            const newFontSize = fontSizeFromWidth(width, newScaling);
            logger.trace(`Slide ${slide.id}: New font size ${newFontSize}, was ${fontSize}`);
            setFontSize(newFontSize);
          } else {
            logger.trace(`Slide ${slide.id}: Found a fixed point for font scaling ${newScaling}`);
            updateSlideSettings(slide, newScaling);
            setNeedsCalculating(false);
          }
        }
      } else if (scalingFactor === 1) {
        logger.trace(`Slide ${slide.id}: Found a fixed point for font scaling ${currentFontScaling}`);
        setNeedsCalculating(false);
        updateSlideSettings(slide, currentFontScaling);
      }
    }
  }
};
