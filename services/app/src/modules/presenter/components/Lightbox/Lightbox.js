import Grid from '@material-ui/core/Grid';
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from '@material-ui/styles';
import 'highlight.js/styles/default.css';
import debounce from "lodash.debounce";
import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from "react-dropzone";
import { useRouteMatch } from "react-router-dom";
import smoothscroll from "smoothscroll-polyfill";
import { Slide } from "../../../../common/slide/Slide";
import { ThemeFactory } from "../../../../common/theme/ThemeFactory";
import { buildCombinedSlideStyles } from "../../queries/buildCombinedSlideStyles";
import { SortableList } from "./components/SortableList/SortableList";
import { PalettesInUseContext } from "./context/PalettesInUseContext";
import { getPalettesInUse } from "./queries/getPalettesInUse";
import { hashForSlideStyles } from "./queries/hashForSlideStyles";
import { hideRemixPanels } from "./queries/hideRemixPanels";
import { useScrollToActiveSlide } from "./queries/useScrollToActiveSlide";
import { remixPreviewStyles } from "./remixPreviewStyles";
import { slideToolbarStyles } from "./slideToolbarStyles";
import { dropzoneSpec } from './transforms/dropzoneSpec';
import { useLightboxStylesByZoom } from "./useLightboxStylesByZoom";

export const ACTIVE_SLIDE_CLASS = 'active-slide';
export const HOVERING_SLIDE_CLASS = 'hovering-slide';
export const LIGHTBOX_THEME_JSS_INDEX = 1;
export const LIGHTBOX_REMIXES_JSS_INDEX = 2;
export const LIGHTBOX_CONTAINER_ID = "lightbox";

/**
 * {@link Lightbox} for showing slides when composing a presentation.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const Lightbox = ({
  id,
  aspect,
  readOnly,
  isPhoneSize,
  slides,
  branding,
  cols,
  themeName,
  metadata = true,
  show,
  activeSlide,
  variant = 'elevation',
  square = false,
  themeClasses,
  operations = {},
}) => {

  const { moveSlide } = operations;
  const slideStyleHash = hashForSlideStyles(slides, themeName);
  const themePackage = ThemeFactory.instance.get(themeName, branding);

  // Prepare palette overrides for all slides to optimise JSS-in-CSS updates.
  const combinedSlideStyles = buildCombinedSlideStyles(slides, themeName, themePackage, branding, false);
  const useSlideStyles = useCallback(makeStyles(combinedSlideStyles, { deterministic: true, meta: 'LightboxSlides', index: LIGHTBOX_REMIXES_JSS_INDEX }), [slideStyleHash, themeName]);
  const slideClasses = useSlideStyles();
  const [scrolledSlide, setScrolledSlide] = useState();
  const [dropZoneIndex, setDropZoneIndex] = useState(-1);
  const [dropZonePosition, setDropZonePosition] = useState(-1);
  const [dropZoneInLightBox, setDropZoneInLightBox] = useState(false);

  const useSlideToolbarStyles = useCallback(slideToolbarStyles(), []);
  const slideToolbarClasses = useSlideToolbarStyles();
  const useRemixPreviewStyles = useCallback(remixPreviewStyles(), []);
  const remixPreviewClasses = useRemixPreviewStyles();
  const useLightboxStyles = useCallback(useLightboxStylesByZoom(cols, readOnly, isPhoneSize), [cols]);
  const lightboxClasses = useLightboxStyles();

  const scrollToActiveSlide = useCallback(useScrollToActiveSlide(activeSlide, scrolledSlide, setScrolledSlide), [activeSlide, scrolledSlide]);
  const route = useRouteMatch();
  const getColumnCount = route.params.view && cols > 1 ? cols - 1 : cols;

  // All palettes currently used in this deck.
  const palettesInUse = useMemo(() => getPalettesInUse(slides, themeName), [slides, themeName]);

  // Initialize polyfill
  useEffect(() => smoothscroll.polyfill(), []);

  // Scroll to the active slide but include a quick debounce to ensure we are not doing multiple scroll actions.
  useEffect(debounce(scrollToActiveSlide, 10));

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    moveSlide(slides, oldIndex, newIndex);
  };

  const helperContainerId = 'slide-sortable-container';
  const {
    getRootProps,
    draggedFiles
  } = useDropzone(
    dropzoneSpec(
      setDropZoneIndex,
      setDropZonePosition,
      setDropZoneInLightBox,
      getColumnCount,
      dropZoneIndex,
      slides,
    )
  );

  const dropZoneProperties = {
    noOfFiles: draggedFiles.length,
    dropZoneIndex,
    dropZonePosition,
    dropZoneInLightBox,
  };

  if (themePackage) {
    const SlideTheme = themePackage.component.wrapWithoutStyles;
    const lightboxSlides = [...(show ? slides.slice(0, show) : slides)];

    if (dropZoneIndex >= 0) {
      lightboxSlides.splice(dropZoneIndex, 0, {});
    }

    const lightBoxWithTheme = () => (
      <PalettesInUseContext.Provider value={palettesInUse}>
        <SlideTheme view={Slide.View.LIGHTBOX} classes={themeClasses}>
          <div id={LIGHTBOX_CONTAINER_ID} className={lightboxClasses.lightbox} key="lightbox" {...getRootProps()}>
            <Grid id={helperContainerId} container style={{ paddingBottom: 586 }} className={`${slideClasses.remixStyles}`}>
              <SortableList
                key="sortable-list"
                axis="xy"
                useDragHandle
                slides={lightboxSlides}
                helperContainer={document.getElementById(helperContainerId)}
                onSortEnd={handleSortEnd}
                onSortStart={hideRemixPanels}
                activeSlide={activeSlide}
                lightboxClasses={lightboxClasses}
                cols={getColumnCount}
                showTutorial={slides.length < cols || slides.length < 3 && cols === 1}
                deckId={id}
                variant={variant}
                aspect={aspect}
                slideClasses={slideClasses}
                branding={branding}
                themePackage={themePackage}
                themeClasses={themeClasses}
                square={square}
                remixPreviewClasses={remixPreviewClasses}
                toolbarClasses={slideToolbarClasses}
                metadata={metadata}
                readOnly={readOnly}
                dropZoneProperties={dropZoneProperties}
                operations={operations}
              />
            </Grid>
          </div>
        </SlideTheme>
      </PalettesInUseContext.Provider>
    );

    if (themePackage.static) {
      return lightBoxWithTheme();
    }

    return (
      <Suspense fallback={<LinearProgress/>}>
        {lightBoxWithTheme()}
      </Suspense>
    );
  }

  // TODO Basically content is not ready?
  return null;
};
export default Lightbox;
