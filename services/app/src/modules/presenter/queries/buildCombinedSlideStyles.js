import { getPaletteOverrides } from "../components/Lightbox/components/LightboxSlide/queries/getPaletteOverride";
import { RemixEngine } from "../../../common/remix/RemixEngine";
import { defaultSlideStyles } from "../components/Slide/DefaultSlideStyles";
import { ThemeFactory } from "../../../common/theme/ThemeFactory";

/**
 * Important: We need to list out palette overrides and remix styles AFTER the default styles,
 * as those should override the defaults.
 */
export const buildCombinedSlideStyles = (slides, themeName = ThemeFactory.DEFAULT_THEME_NAME, themePackage, branding, animate = true) => {
  if (!Array.isArray(slides)) {
    slides = [slides];
  }
  const themeClass = themePackage && themePackage.component;
  const slideBranding = branding && themePackage && themePackage.component.branded ? branding : undefined;
  const paletteOverrideStyles = getPaletteOverrides(slides, themeClass, slideBranding);
  const { instance: remixEngine } = RemixEngine;
  const remixStyles = remixEngine.css(slides, animate, themeName);

  return { ...defaultSlideStyles, ...remixStyles, ...paletteOverrideStyles };
};
