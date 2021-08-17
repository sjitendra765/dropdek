import { chooseRemix } from "../../../../../common/slide/transforms";
import { getPaletteForSlide } from "../../../../../common/slide/transforms/palette/getPaletteForSlide";

export const hashForSlideStyles = (slides, themeName) => {
  if (!slides || !themeName) {
    return null;
  }
  const remixHash = slides.map((slide) => {
    const remix = chooseRemix(slide);
    return remix || '';
  }).sort().join(',');

  const paletteHash = slides.map((slide) => {
    const palette = getPaletteForSlide(themeName, slide.settings);
    return palette ? palette.id() : '';
  }).sort().join(',');

  return `${remixHash}_${paletteHash}`;
};
