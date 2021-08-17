import { RemixEngine } from "../../remix/RemixEngine";
import { hasPaletteForSlide } from "./palette/getPaletteForSlide";

export const getRemixKeyForSlide = (remix, themeName, slide) => {
  if (typeof remix === 'string') {
    remix = RemixEngine.instance.get(remix);
  }
  if (remix) {
    const hasPalette = hasPaletteForSlide(themeName, slide.settings);
    if (remix.relativeToPalette && hasPalette) {
      return `.slide-${slide.id}`;
    }
  }
  return '';
};
