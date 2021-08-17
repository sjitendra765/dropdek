import { ThemeFactory } from "../../../theme/ThemeFactory";
import { getPaletteForSlide } from "./getPaletteForSlide";

export const getColorChartForSlide = (themeName, settings) => {
  const palette = getPaletteForSlide(themeName, settings);
  let theme = ThemeFactory.instance.get(themeName).component;
  if (!theme) {
    theme = ThemeFactory.DEFAULT_THEME;
  }
  return theme.colorChart(palette);
};
