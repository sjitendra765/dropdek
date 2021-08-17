import React from 'react';
import { makeStyles } from "@material-ui/styles";
import useDimensions from "react-cool-dimensions";
import { toMarkupElements } from "./builder/toMarkupElements";
import { chooseRemix } from "../../../../common/slide/transforms/chooseRemix";
import { getPaletteOverride } from "../Lightbox/components/LightboxSlide/queries/getPaletteOverride";
import { paletteOverrideKey } from "../Lightbox/transforms/paletteOverrideKey";
import { fontSizeFromWidth } from "../Lightbox/components/LightboxSlide/queries/fontSizeFromWidth";
import { DEFAULT_SCALING } from "./scalingLimits";
import { SCALING } from "../../../composer/components/DeckEditor/modules/plugins/scaling/setScaling";
import { calculateSlideSize } from "../../../../common/util/ScreenSizeUtils";
import { SlideDimensionsContext } from "./context/SlideDimensionsContext";

/**
 * A Slide combines all the components for a given slide. It does not apply a theme.
 */
export default function Slide({
  aspect,
  branding,
  slide,
  className,
  remixName,
  theme,
  paletteOverrideClasses,
  fixedDimensions,
}) {

  // eslint-disable-next-line prefer-const
  let { ref: resizeRef, width, height } = useDimensions();
  if (fixedDimensions !== undefined) {
    width = fixedDimensions.width;
    height = fixedDimensions.height;
    resizeRef = () => {}; // no-op ref
  }
  if (!remixName) {
    remixName = chooseRemix(slide);
  }

  const slideDimensions = calculateSlideSize(width, height, aspect);

  // elements that should be rendered on the slide
  const elements = (slide && slide.markup) ? toMarkupElements(slide) : [];

  const slideScaling = (slide && slide.settings) ? slide.settings[SCALING] || DEFAULT_SCALING : DEFAULT_SCALING;
  const fontSize = fontSizeFromWidth(slideDimensions.width, slideScaling);

  const styleKey = paletteOverrideKey(slide);
  if (!paletteOverrideClasses) {
    const style = {};
    style[styleKey] = getPaletteOverride(slide, theme, branding);
    paletteOverrideClasses = makeStyles(style)();
  }

  const aggregateClassName = `${className} ${paletteOverrideClasses[styleKey] ? paletteOverrideClasses[styleKey] : ''}`;
  const aggregateSlideClassName = `slide ${remixName || ""} slide-${slide.id}`;
  return (
    <SlideDimensionsContext.Provider value={slideDimensions}>
      <div ref={resizeRef} className={aggregateClassName} style={{ fontSize, height: "100%", display: "flex" }}>
        <div className={aggregateSlideClassName} style={{ margin: "auto", width: slideDimensions.width, height: slideDimensions.height, overflow: "hidden" }}>
          <div className="deck-logo-container"><div className="deck-logo-container-inner" /></div>
          {elements}
          <div className="hook" />
        </div>
      </div>
    </SlideDimensionsContext.Provider>
  );
}
