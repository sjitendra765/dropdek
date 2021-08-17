/**
 * Given a slide and a list of remixes, create a clone of the slide for every remix,
 * and
 * @param slide
 * @param remixes
 */
import { Slide } from "../../../../../../../common/slide/Slide";
import { SCALING } from "../../../../../../composer/components/DeckEditor/modules/plugins/scaling/setScaling";
import { KEY_PALETTES } from "../../../../../../../common/slide/transforms/palette/setPaletteForSlide";
import { compileSlideMarkup, generateSlide } from "../../../../../../../common/slide";

export const slidesForPreview = (slide, remixes, themeName, palette) => {

  // Clone the slide data and generate the slide markup.
  const { node, path } = slide;
  const slideNode = {
    ...node,
    settings: {
      [KEY_PALETTES]: {
        [themeName]: palette.toDataObject(),
      }
    },
  };
  const baseSlide = generateSlide(slideNode, path, Slide.View.LIGHTBOX, themeName);

  return remixes.map((remix, index) => {
    const previewSlide = Slide.shallowClone(baseSlide);
    previewSlide.id = `${previewSlide.id}-${index}`;
    previewSlide.remix = remix.name;
    previewSlide.settings.remix = remix.name;
    previewSlide.settings[SCALING] = undefined; // reset scaling
    compileSlideMarkup(previewSlide, remix.name); // recompile the markup
    return previewSlide;
  });
};
