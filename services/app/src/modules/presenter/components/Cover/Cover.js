import React, { Suspense, useCallback, useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/styles";
import 'swiper/swiper.scss';
import { ThemeFactory } from "../../../../common/theme/ThemeFactory";
import { getSlideWidthFromBoundingRect } from "../../transforms/getSlideWidthFromBoundingRect";
import { generateSlide } from "../../../../common/slide/SlideFactory";
import { ProgressTracker } from "../../../../common/util/ProgressTracker";
import { buildCombinedSlideStyles } from "../../queries/buildCombinedSlideStyles";
import { SlidePlayerWithTheme } from "./components/SlidePlayerWithTheme";

const Cover = ({ node, themeName, branding, aspect }) => {

  const [ready, setReady] = useState(false);
  const monitor = new ProgressTracker(() => {
    if (!ready) {
      setReady(true);
    }
  });

  const slide = generateSlide(node, undefined, undefined, themeName, monitor);
  const themePackage = ThemeFactory.instance.get(themeName, branding);
  const SlideTheme = themePackage.component.wrap;

  // Prepare palette overrides for all slides to optimise JSS-in-CSS updates.
  const combinedSlideStyles = buildCombinedSlideStyles(slide, themeName, themePackage, branding, false);
  const useSlideStyles = useCallback(makeStyles(combinedSlideStyles), [slide, themePackage]);
  const slideClasses = useSlideStyles();

  const [slideWidth, setSlideWidth] = useState(0);
  const ref = useCallback(getSlideWidthFromBoundingRect(setSlideWidth), [slideWidth]);

  if (!themePackage.static) {
    return (
      <div ref={ref} style={{ height: "100%" }}>
        <Suspense fallback={<LinearProgress/>}>
          <SlidePlayerWithTheme
            ready={ready}
            aspect={aspect}
            branding={branding}
            slide={slide}
            slideClasses={slideClasses}
            SlideTheme={SlideTheme}
            slideWidth={slideWidth}
            themePackage={themePackage}
          />
        </Suspense>
      </div>
    );
  }

  return (
    <div ref={ref} style={{ height: "100%" }}>
      <Suspense fallback={<LinearProgress/>}>
        {slideWidth > 0 ? (
          <SlidePlayerWithTheme
            ready={ready}
            branding={branding}
            slide={slide}
            slideClasses={slideClasses}
            SlideTheme={SlideTheme}
            slideWidth={slideWidth}
            themePackage={themePackage}
            aspect={aspect}
          />
        ) : null}
      </Suspense>
    </div>
  );

};
export default Cover;
