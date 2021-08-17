import Unsplash from "../../../sdk/services/Unsplash";
import { logger } from "../../../../util/logger";
import { FROM_UNSPLASH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/components/ImageEditorElement";

export const suggestImagesForSlide = (query, rpp = 1) => () => {
  if (query && query.length > 0) {
    const t0 = new Date().getTime();
    return Unsplash.suggest(query, rpp)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        return undefined;
      })
      .then((images) => {
        const t1 = new Date().getTime();
        logger.debug(`Searching Unsplash for a new image took ${t1 - t0} ms`);
        if (images) {
          return images.map((img) => ({
            url: img.urls.raw,
            description: img.alt_description,
            from: FROM_UNSPLASH,
            label: img.label,
          }));
        }
        return images;
      });
  }
  return new Promise((resolve) => resolve());
};
