import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useCallback, useEffect, useRef, useState } from "react";
import computeScrollIntoView from 'compute-scroll-into-view';
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import SwipeableViews from "react-swipeable-views";
import smoothscroll from 'smoothscroll-polyfill';
import GenericButtonGroup from "../../../../../../common/components/buttons/GenericButtonGroup";
import { buildCombinedSlideStyles } from "../../../../queries/buildCombinedSlideStyles";
import { PalettePopup } from "../PaletteSuggestionComponent/PaletteSuggestionComponent";
import Section from "../../../../../../common/components/popup/Section";
import { chooseRemix } from "../../../../../../common/slide/transforms";
import { getPaletteForSlide } from "../../../../../../common/slide/transforms/palette/getPaletteForSlide";
import { LIGHTBOX_REMIXES_JSS_INDEX } from "../../Lightbox";
import LightboxSlide from "../LightboxSlide/LightboxSlide";
import CustomiseColors from "./components/CustomiseColors";
import { slidesForPreview } from "./transforms/slidesForPreview";
import GenericButton from "../../../../../../common/components/buttons/GenericButton";

const setScalingNoOp = () => {};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>{children}</div>
      )}
    </div>
  );
};

const RemixPreview = ({
  width,
  slide,
  deckId,
  revert,
  close,
  setRemix,
  branding,
  themeClasses,
  pickPalette,
  themePackage,
  remixPreviewClasses,
  aspect
}) => {

  const topRef = useRef();

  const themeClass = themePackage && themePackage.component;
  const SlideTheme = themeClass.wrapWithoutStyles;
  const themeName = themeClass && themeClass.id;

  const { matchingRemixes, settings } = slide;
  const originalPalette = getPaletteForSlide(themeName, settings);
  const [currentPalette, setCurrentPalette] = useState(originalPalette);
  const originalRemix = chooseRemix(slide);
  const [currentRemixName, setCurrentRemixName] = useState(originalRemix);
  const paletteHash = currentPalette.id();
  const slideWidth = 200;

  const changesInPreviewPanel = () => originalPalette.id() !== currentPalette.id() || originalRemix !== currentRemixName;
  const [previewSlides, setPreviewSlides] = useState(null);
  const [previewSlidesHash, setPreviewSlidesHash] = useState(null);
  const [combinedSlideStyles, setCombinedSlideStyles] = useState({});

  smoothscroll.polyfill();

  // Note: We need to ensure that the JSS index is higher (= more specific) than the Lightbox remix JSS.
  const useSlideStyles = useCallback(
    makeStyles(
      combinedSlideStyles,
      { deterministic: false, meta: 'RemixPreviewSlides', index: LIGHTBOX_REMIXES_JSS_INDEX + 1 }
    ), [previewSlidesHash]
  );
  const slideClasses = useSlideStyles();
  useEffect(() => {
    if (topRef && topRef.current) {
      const actions = computeScrollIntoView(topRef.current, {
        // scrollMode: "if-needed",
        block: 'start',
      });
      actions.forEach(({ el, top, left }) => {
        if (el.scrollTop < top) {
          el.scrollTo({ top, behavior: 'smooth' });
        }
      });
    }
  }, [topRef]);

  // Set up the panel.
  useEffect(() => {
    const slides = slidesForPreview(slide, matchingRemixes, themeName, currentPalette);
    const styles = buildCombinedSlideStyles(slides, themeName, themePackage, branding, false, false);

    setPreviewSlides(slides);
    setCombinedSlideStyles(styles);
    setPreviewSlidesHash(`slides-${new Date().getTime()}`);
  }, [paletteHash]);

  const [edge, setEdge] = useState(0);

  const refParent = useRef();
  const ref = useRef();

  const calculateEdgesAndSize = () => {
    if (refParent.current.clientWidth - 16 > ref.current.scrollWidth * 1.01) {
      setEdge(-2);
    } else if (Math.round(ref.current.scrollLeft + ref.current.offsetWidth) === Math.round(ref.current.scrollWidth)) {
      setEdge(1);
    } else if (ref.current && ref.current.scrollLeft === 0) {
      setEdge(-1);
    } else {
      setEdge(0);
    }
  };

  // Set up scrolling when the width changes.
  useEffect(() => {
    const activeSlide = document.querySelector(`.${remixPreviewClasses.activeRemix}`);
    if (activeSlide && ref && ref.current && refParent && refParent.current) {
      ref.current.scrollTo({
        left: (activeSlide.offsetLeft - 45 - ((width - 200) / 2) + (Math.floor(width / 200) * 8)),
        behavior: "auto"
      });

      calculateEdgesAndSize();

      let isScrolling;
      ref.current.onscroll = (e) => {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
          calculateEdgesAndSize();
        }, 66);
      };
    }
  }, [previewSlidesHash]); // sign that the panel is ready

  // Functions to update both the global value + local value.
  const revertChanges = () => {
    revert();
    setCurrentRemixName(originalRemix);
    setCurrentPalette(originalPalette);
  };

  const setRemixCached = (s, remixName) => {
    setCurrentRemixName(remixName);
    setRemix(s, remixName);
  };

  const setPaletteCached = (p) => {
    setCurrentPalette(p);
    pickPalette(slide, themePackage.component.id, p);
  };

  const pickPaletteCached = (s, themeName, p) => {
    setPaletteCached(p);
  };

  const scrollLeft = () => {
    ref.current.scrollBy({ left: width * -0.6, behavior: "smooth" });
  };
  const scrollRight = () => {
    ref.current.scrollBy({ left: width * 0.6, behavior: "smooth" });
  };

  const [tabValue, setTabValue] = React.useState(0);

  const handleChangeIndex = (index) => {
    setTabValue(index);
  };

  const [selectedPaletteTab, setSelectedPaletteTab] = useState(0);

  return (
    <div ref={topRef}>
      { !previewSlides ? null : (
        <div key={`slide-preview-pane-${slide.id}`} className={remixPreviewClasses.root}>
          <Section>
            {previewSlides && previewSlides.length > 0 ? (
              <div ref={refParent} style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: 8, marginRight: 8, padding: "16px 8px 16px 8px", position: "relative", }}>
                <div className={`${remixPreviewClasses.paginateRemix}`}>
                  <IconButton color="primary" onClick={scrollLeft} size="small" disabled={(!ref || !ref.current) || edge === -1 || edge === -2}>
                    <KeyboardArrowLeft/>
                  </IconButton>
                </div>
                <div className={`${slideClasses.remixStyles} ${remixPreviewClasses.container}`} ref={ref} style={{ overscrollBehaviorX: "contain" }}>
                  <div style={{ minWidth: "101%" }}>
                    <SlideTheme slideWidth={slideWidth} classes={themeClasses}>
                      {previewSlides.map((s) => (
                        <div key={s.id} tabIndex={0} className={`${remixPreviewClasses.wrapper} ${s.remix === currentRemixName ? remixPreviewClasses.activeRemix : ''}`} onClick={() => setRemixCached(slide, s.remix)} role="button">
                          <LightboxSlide operations={{ setFontScaling: setScalingNoOp }} readOnly aspect={aspect} theme={themeClass} branding={themeClass.branded && branding} slide={s} className={slideClasses.slideRoot} paletteOverrideClasses={slideClasses}/>
                        </div>
                      ))}
                    </SlideTheme>
                  </div>
                </div>
                <div className={`${remixPreviewClasses.paginateRemix}`}>
                  <IconButton color="primary" onClick={scrollRight} size="small" disabled={(!ref || !ref.current) || edge === 1 || edge === -2}>
                    <KeyboardArrowRight/>
                  </IconButton>
                </div>
              </div>
            ) : null}

            <SwipeableViews
              axis="x"
              index={tabValue}
              onChangeIndex={handleChangeIndex}>

              <TabPanel key={`preview-pane-palettes-${slide.id}`} value={tabValue} index={0} style={{ minHeight: 200, }}>
                <PalettePopup width="auto" deckId={deckId} theme={themePackage.component} slide={slide} pickPalette={pickPaletteCached} />
              </TabPanel>
              <TabPanel key={`preview-pane-colors-${slide.id}`} value={tabValue} index={1} style={{ minHeight: 262 }}>
                <CustomiseColors
                  slide={slide}
                  branding={branding}
                  width={width}
                  palette={currentPalette}
                  setPalette={setPaletteCached}
                  selectedPaletteTab={selectedPaletteTab}
                  setSelectedPaletteTab={setSelectedPaletteTab}
                />
              </TabPanel>
            </SwipeableViews>

            {tabValue === 0 ? (
              <div style={{ display: "flex", justifyContent: "space-between", padding: "20px 30px 10px 30px" }}>
                <div>
                  <GenericButton secondary onClick={() => setTabValue(1)}>
                    {width < 320 ? "Customize" : "Customize Colors"}
                  </GenericButton>
                </div>
                <GenericButtonGroup>
                  <GenericButton onClick={revertChanges} disabled={!changesInPreviewPanel()}>
                    Revert
                  </GenericButton>
                  <GenericButton primary onClick={close}>
                    Done
                  </GenericButton>
                </GenericButtonGroup>
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between", padding: "20px 30px 10px 30px" }}>
                <div>
                  <GenericButton secondary onClick={() => setTabValue(0)}>
                    Back
                  </GenericButton>
                </div>
                <GenericButtonGroup>
                  <GenericButton onClick={revertChanges} disabled={!changesInPreviewPanel()}>
                    Revert
                  </GenericButton>
                  <GenericButton primary onClick={close}>
                    Done
                  </GenericButton>
                </GenericButtonGroup>
              </div>
            )}
          </Section>
        </div>
      )}
    </div>
  );
};
export default RemixPreview;
