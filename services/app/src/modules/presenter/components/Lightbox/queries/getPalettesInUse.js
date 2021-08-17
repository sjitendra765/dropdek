import { getPaletteForSlide } from "../../../../../common/slide/transforms/palette/getPaletteForSlide";

/**
 * Returns a list of distinct palettes being used by the list of slides.
 *
 * @param slides list of slides in a deck.
 * @param themeName chosen theme.
 */
export const getPalettesInUse = (slides, themeName) => {
  const palettesById = {};
  slides.forEach((slide) => {
    const palette = getPaletteForSlide(themeName, slide.settings);
    if (palette && !palettesById[palette.id()]) {
      palettesById[palette.id()] = palette;
    }
  });
  return Object.values(palettesById);
};
