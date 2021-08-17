import { logger } from '../../../../../../../common/util/logger';

export const SCALING = 'scaling';

export const setScaling = (editor) => (slide, scaling) => {
  // Only update if the scaling has changed!
  const settings = editor.settings(slide.path);
  const currentScaling = settings ? settings.get(SCALING) : undefined;
  if (scaling !== undefined && currentScaling !== scaling) {
    logger.trace(`Scaling for slide ${slide.id} has changed from ${currentScaling} to ${scaling} - sending updates`);
    settings.set(SCALING, scaling);
  } else {
    logger.trace(`Scaling for slide ${slide.id} has not changed - NOT sending updates`);
  }

};
