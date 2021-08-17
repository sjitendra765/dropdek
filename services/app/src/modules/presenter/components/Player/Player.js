import React, { Suspense, useCallback, useEffect, useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import SwiperCore, { A11y, HashNavigation, Keyboard } from 'swiper';
import { makeStyles } from "@material-ui/styles";
import 'swiper/swiper.scss';
import { ThemeFactory } from "../../../../common/theme/ThemeFactory";
import { getSlideWidthFromBoundingRect } from "../../transforms/getSlideWidthFromBoundingRect";
import { ProgressTracker } from "../../../../common/util/ProgressTracker";
import { buildCombinedSlideStyles } from "../../queries/buildCombinedSlideStyles";
import { SlidePlayerWithTheme } from "./components/SlidePlayerWithTheme";

SwiperCore.use([A11y, Keyboard, HashNavigation]);

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    "& .swiper-container": {
      height: "100%"
    }
  }
}));

const Player = ({
  slides,
  aspect,
  themeName,
  branding,
  slidesPerView = 1,
  spaceBetween = 0,
  preview = false,
  startSlide,
  onSlideChange,
  onMouseEnter,
  onMouseLeave,
  animate = true,
  playerControls,
  setIsBeginning,
  setIsEnd,
  monitor = ProgressTracker.DUMMY,
  go = true
}) => {
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    if (swiper) {
      if (playerControls) {
        playerControls.previous = () => swiper.slidePrev();
        playerControls.next = () => swiper.slideNext();
      }
      if (setIsBeginning && setIsEnd) {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
      }
      if (onSlideChange) {
        swiper.on("slideChangeTransitionStart", () => {
          onSlideChange(slides[swiper.activeIndex]);
        });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swiper]);

  useEffect(() => {
    if (swiper) {
      swiper.allowSlideNext = go;
    }
  }, [swiper, go]);

  const themePackage = ThemeFactory.instance.get(themeName, branding);

  // Prepare palette overrides for all slides to optimise JSS-in-CSS updates.
  const combinedSlideStyles = buildCombinedSlideStyles(slides, themeName, themePackage, branding, animate);
  const useSlideStyles = useCallback(makeStyles(combinedSlideStyles), [slides, themePackage]);
  const slideClasses = useSlideStyles();

  const params = {
    slidesPerView,
    height: "100%",
    autoHeight: false,
    mousewheel: true,
    keyboard: {
      enabled: !preview,
    },
    cssMode: !preview,
    spaceBetween,
    runCallbacksOnInit: true,
    on: {
      fromEdge: () => {
        if (setIsBeginning && setIsEnd) {
          setIsBeginning(false);
          setIsEnd(false);
        }
      },
      reachBeginning: () => {
        if (setIsBeginning) {
          setIsBeginning(true);
        }
      },
      reachEnd: () => {
        if (setIsEnd) {
          setIsEnd(true);
        }
      }
    }
  };

  if (startSlide) {
    params.initialSlide = startSlide;
  }

  if (!preview) {
    params.hashNavigation = {
      replaceState: true,
    };
  }

  const [slideWidth, setSlideWidth] = useState(0);
  const ref = useCallback(getSlideWidthFromBoundingRect(setSlideWidth), [slideWidth]);

  const classes = useStyles();

  if (!themePackage.static) {
    return (
      <div className={classes.root} ref={ref}>
        <SlidePlayerWithTheme
          aspect={aspect}
          branding={branding}
          themePackage={themePackage}
          slideWidth={slideWidth}
          slides={slides}
          slideClasses={slideClasses}
          monitor={monitor}
          params={params}
          setSwiper={setSwiper}
        />
      </div>
    );
  }

  return (
    <div ref={ref} className={classes.root} onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}>
      <Suspense fallback={<LinearProgress/>}>
        {slideWidth > 0 ? (
          <SlidePlayerWithTheme
            aspect={aspect}
            branding={branding}
            themePackage={themePackage}
            slideWidth={slideWidth}
            slides={slides}
            slideClasses={slideClasses}
            monitor={monitor}
            params={params}
            setSwiper={setSwiper}
          />
        ) : null}
      </Suspense>
    </div>
  );

};
export default Player;
