import { ThemeFactory } from "../../../theme/ThemeFactory";
import { KEY_PALETTES } from "./setPaletteForSlide";
import Palette from "../../../../theme/Palette";

export const hasPaletteForSlide = (themeName, settings) => (themeName && settings[KEY_PALETTES] !== undefined && settings[KEY_PALETTES][themeName] !== undefined);

export const getPaletteForSlide = (themeName = ThemeFactory.DEFAULT_THEME_NAME, settings) => {
  if (themeName && settings[KEY_PALETTES] && settings[KEY_PALETTES][themeName]) {
    const { accentColor, backgroundColor, titleColor, subtitleColor, textColor, colorScale, imagePath } = settings[KEY_PALETTES][themeName];
    return new Palette(accentColor, backgroundColor, titleColor, subtitleColor, textColor, colorScale, imagePath);
  }

  if (themeName) {
    const theme = ThemeFactory.instance.get(themeName).component;
    return theme ? theme.defaultPalette() : undefined;
  }
  return undefined;
};
