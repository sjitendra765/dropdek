// We downscale when the content has reached this limit as
// a percentage of the overall scroll height.
import { logger } from "../../../../../../../common/util/logger";

const DOWNSCALING_MIN = 0.9;
const DOWNSCALING_MAX = 0.8;

export const getOverflowScaling = (element) => {
  const t0 = new Date().getTime();
  let scalingFactor = 1;
  if (element && element !== null) {
    const { scrollHeight, clientHeight, scrollWidth, clientWidth, } = element;
    const heightOverflows = (scrollHeight > clientHeight && scrollHeight > 0);
    const widthOverflows = (scrollWidth > clientWidth && scrollWidth > 0);

    if (heightOverflows || widthOverflows) {
      const heightScaling = scrollHeight > 0 ? clientHeight / scrollHeight : 1;
      logger.trace(`Scaling height by a factor of ${heightScaling}`);
      const widthScaling = scrollWidth > 0 ? clientWidth / scrollWidth : 1;
      logger.trace(`Scaling width by a factor of ${widthScaling}`);

      // We want scaling between DOWNSCALING_MAX and DOWNSCALING_MIN:
      scalingFactor = Math.max(Math.min(widthScaling, heightScaling, DOWNSCALING_MIN), DOWNSCALING_MAX);
    }
    const t1 = new Date().getTime();
    logger.trace(`Calculating overflow took ${t1 - t0} ms`);
    return scalingFactor;
  }
  return scalingFactor;
};
