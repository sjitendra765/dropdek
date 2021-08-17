import { Slide } from "../../../../../../../../common/slide/Slide";
import { generateSlide } from "../../../../../../../../common/slide";
import { componentBuilder } from "../../../../../../../../common/api/plugins/builder/ComponentBuilder";
import { KEY_PALETTES } from "../../../../../../../../common/slide/transforms/palette/setPaletteForSlide";

/**
 * Build slides from a list of slide templates.
 *
 * @param templates
 */
export const slidesFromTemplates = (templates, path, baseNode, themeName) => {
  const builder = componentBuilder();
  return templates.map((template) => {
    const { remixName, palette } = template;
    const settings = {
      remix: remixName,
    };
    if (palette) {
      settings[KEY_PALETTES] = {
        [themeName]: palette.toDataObject(),
      };
    }
    const templateExtension = template.extendFrom(baseNode);
    const children = [...baseNode.children, ...templateExtension];
    const slideNode = builder.slide(settings, children).build();
    const slide = generateSlide(slideNode, path, Slide.View.LIGHTBOX, themeName);
    return slide;
  });
};
