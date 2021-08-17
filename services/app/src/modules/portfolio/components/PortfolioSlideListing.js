import React, { Suspense, useCallback, useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { ThemeFactory } from "../../../common/theme/ThemeFactory";
import Breakpoints from "../../../common/util/Breakpoints";
import { getSlideWidthFromBoundingRect } from "../../presenter/transforms/getSlideWidthFromBoundingRect";
import LightboxSlideContainer from "../../presenter/components/Lightbox/components/LightboxSlide";
import { buildCombinedSlideStyles } from "../../presenter/queries/buildCombinedSlideStyles";

const useStyles = makeStyles((appTheme) => ({
  slide: {
    position: 'relative',
    marginBottom: '22px',
  },

  card: {
    position: 'relative',
  },
  remixName: {
    display: 'block',
    position: 'absolute',
    bottom: appTheme.spacing(-1),
    left: appTheme.spacing(2.5),
    color: '#969697',
    fontWeight: '400',
    background: 'none',
    fontSize: '12px',
    lineHeight: '16px',
    textIndent: '0',
    textAlign: 'left',
    zIndex: '1',
  },
  score: {
    display: 'block',
    position: 'absolute',
    bottom: appTheme.spacing(-1),
    right: appTheme.spacing(2.5),
    color: '#969697',
    fontWeight: '400',
    background: 'none',
    fontSize: '12px',
    lineHeight: '16px',
    textIndent: '0',
    textAlign: 'right',
    zIndex: '1',
  },
}));

const PortfolioSlideListing = ({ slides, theme, branding, slidesPerView = 1, spaceBetween = 0 }) => {

  const themePackage = ThemeFactory.instance.get(theme, branding);
  const combinedSlideStyles = buildCombinedSlideStyles(slides, theme, themePackage, branding, false);
  const useSlideStyles = makeStyles(combinedSlideStyles, { deterministic: false });
  const slideClasses = useSlideStyles();

  const SlideTheme = themePackage.component.wrap;

  const getScore = (slide) => {
    const { remix } = slide.settings;
    if (remix) {
      for (let i = 0; i < slide.matchingRemixes.length; i++) {
        if (slide.matchingRemixes[i].name === remix) {
          return slide.matchingRemixes[i].score;
        }
      }
    }
    return 0;
  };

  const classes = useStyles();
  const slideComponents = () => slides.map((slide, index) => (
    <Grid item key={`slide-wrapper-${index}`} className={classes.slide} {...Breakpoints.slide(3)}>
      <Card>
        <div className={classes.remixName}>
          { slide.settings.remix ? slide.settings.remix : 'No remix' }
        </div>
        <span className={classes.score}>
          Score: { getScore(slide) }
        </span>
        <LightboxSlideContainer
          readOnly
          paletteOverrideClasses={slideClasses}
          key={`slide-${index}`}
          theme={themePackage.component}
          branding={themePackage.component.branded && branding}
          slide={slide}
          className={slideClasses.slideRoot}
          remix={slide.settings.remix}
          operations={{
            setFontScaling: () => {},
          }}
        />
      </Card>
    </Grid>
  ));

  const [slideWidth, setSlideWidth] = useState(0);
  const ref = useCallback(getSlideWidthFromBoundingRect(setSlideWidth), [slideWidth]);

  const slidePlayerWithTheme = () => (
    <SlideTheme>
      <DndProvider backend={HTML5Backend}>
        <div className={slideClasses.remixStyles}>
          <Grid container spacing={spaceBetween} style={{ marginBottom: 100 }} className={slideClasses.remixStyles}>
            {slides ? slideComponents() : null}
          </Grid>
        </div>
      </DndProvider>
    </SlideTheme>
  );

  if (!themePackage.static) {
    return (
      <div ref={ref}>
        {slidePlayerWithTheme()}
      </div>
    );
  }

  return (
    <div ref={ref}>
      <Suspense fallback={<LinearProgress/>}>
        {slideWidth > 0 ? slidePlayerWithTheme() : null}
      </Suspense>
    </div>
  );

};
export default PortfolioSlideListing;
