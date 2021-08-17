import SlideAnalyzerService from "../../../../../../../common/slide/analysis/SlideAnalyzerService";
import ColorSwatchAnalyzer from "../../../../../../../common/slide/analysis/analyzers/ColorSwatch/ColorSwatchAnalyzer";
import { extractPaletteSuggestions } from "../../../transforms/extractPaletteSuggestions";
import LogoPaletteAnalyzer
  from "../../../../../../composer/components/DeckEditor/modules/plugins/component/media/logo/analysis/LogoPaletteAnalyzer";

/**
 * Analyse the slide and gather palette suggestions.
 *
 * @param slide slide instance.
 * @param theme theme name.
 */
export const getPalettesSuggestionsForSlide = (slide, theme) => {
  const imageColorSwatchAnalysis = (slide.node ? SlideAnalyzerService.process(new ColorSwatchAnalyzer(), slide.node) : {});
  const imageColorSwatchSuggestions = imageColorSwatchAnalysis.ColorSwatchAnalyzer ? imageColorSwatchAnalysis.ColorSwatchAnalyzer.paletteSuggestions : [];
  const imagePaletteSuggestions = extractPaletteSuggestions(imageColorSwatchSuggestions, theme);

  const logoPaletteColorPalettes = (slide.node ? SlideAnalyzerService.process(new LogoPaletteAnalyzer(), slide.node) : []);
  const logoPaletteSuggestions = extractPaletteSuggestions(logoPaletteColorPalettes, theme);
  return [...imagePaletteSuggestions, ...logoPaletteSuggestions];
};
