import { paletteOverrideKey } from "../../../transforms/paletteOverrideKey";
import Palette from "../../../../../../../theme/Palette";
import { getPaletteForSlide } from "../../../../../../../common/slide/transforms/palette/getPaletteForSlide";
import { chooseRemix } from "../../../../../../../common/slide/transforms";

export const getPaletteOverrides = (slides, theme, branding) => {
  const paletteOverrideStyles = {};
  slides.forEach((slide) => {
    const slidePaletteOverrides = getPaletteOverride(slide, theme, branding);
    if (Object.keys(slidePaletteOverrides).length > 0) {
      paletteOverrideStyles[paletteOverrideKey(slide)] = slidePaletteOverrides;
    }
  });
  return paletteOverrideStyles;
};

export const getPaletteOverride = (slide, theme, branding) => {
  if (theme) {
    const p = getPaletteForSlide(theme.id, slide.settings) || theme.defaultPalette();
    const remixName = chooseRemix(slide);
    const { accentColor, backgroundColor, titleColor, subtitleColor, textColor, colorScale, imagePath } = p;
    const palette = new Palette(accentColor, backgroundColor, titleColor, subtitleColor, textColor, colorScale, imagePath);
    const css = theme.cssForPalette(palette, remixName, branding);
    return css;
  }

  return {};
};
