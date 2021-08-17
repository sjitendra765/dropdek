import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/styles";
import useDimensions from "react-cool-dimensions";
import { useDropzone } from "react-dropzone";
import { getPaletteOverride } from "./queries/getPaletteOverride";
import { fontSizeFromWidth } from "./queries/fontSizeFromWidth";
import { DEFAULT_SCALING, MIN_SCALING } from "../../../Slide/scalingLimits";
import { fixedAspectHeight } from "../../../Slide/queries/fixedAspectHeight";
import { calculateScaling } from "./queries/calculateScaling";
import { paletteOverrideKey } from "../../transforms/paletteOverrideKey";
import { chooseRemix } from "../../../../../../common/slide/transforms/chooseRemix";
import { SCALING } from "../../../../../composer/components/DeckEditor/modules/plugins/scaling/setScaling";
import { logger } from "../../../../../../common/util/logger";
import { hashForSlide } from "../../queries/hashForSlide";
import { SlideDimensionsContext } from "../../../Slide/context/SlideDimensionsContext";
import EditableSlideMarkupBuilder from "./markup/EditableSlideMarkupBuilder";
import { RemixEngine } from "../../../../../../common/remix/RemixEngine";
import SlideMarkupBuilder from "../../../Slide/builder/SlideMarkupBuilder";
import {
  ACCEPTED_IMAGE_TYPES,
  IMAGE_MAX_SIZE
} from "../../../../../composer/components/DeckEditor/modules/plugins/component/media/image/components/ImageDropZone";
import { onDropImage } from "./transforms/onDropImage";

const styles = () => makeStyles(() => ({
  overlay: {
    opacity: 1,
    zIndex: 99,
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      background: '#84ffa327',
      border: '2px dashed #09cc39',
      borderRadius: '6px',
      backgroundRepeat: 'no-repeat',
      backgroundPositionX: 'calc(100% - 7px)',
      backgroundPositionY: 'calc(0% + 7px)',
      backgroundImage: `url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='113px' height='24px' viewBox='0 0 113 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1'%3E%3Cg id='Icon-and-Text'%3E%3Cpath id='Rounded-Rectangle-copy' d='M5 0 C2.239 0 0 2.239 0 5 L0 19 C0 21.761 2.239 24 5 24 L108 24 C110.761 24 113 21.761 113 19 L113 5 C113 2.239 110.761 0 108 0 Z' fill='%2309cc39' fill-opacity='1' stroke='none'/%3E%3Cdefs%3E%3Ctext id='string' transform='matrix(1.0 0.0 0.0 1.0 25.0 3.5)' x='1.0' font-size='13.968' text-decoration='none' font-family='Inter, Helvetica Neue, Helvetica, Arial' y='14.0' fill='%23ffffff'%3EADD IMAGE%3C/text%3E%3C/defs%3E%3Cuse id='ADD-IMAGE' xlink:href='%23string'/%3E%3Cg id='New-Group-copy'%3E%3Cpath id='Triangle' d='M15.074 12.368 L12.158 16.053 17.99 16.053 Z' fill='%23ffffff' fill-opacity='1' stroke='none'/%3E%3Cpath id='Triangle-copy' d='M11.39 13.105 L9.057 16.053 13.722 16.053 Z' fill='%23ffffff' fill-opacity='1' stroke='none'/%3E%3Cpath id='Path' d='M21 7.211 L21 8.684 18.789 8.684 18.789 10.895 17.316 10.895 17.316 8.684 15.105 8.684 15.105 7.211 17.316 7.211 17.316 5 18.789 5 18.789 7.211 Z M18.789 17.526 L8.474 17.526 8.474 7.211 12.895 7.211 12.895 5.737 8.474 5.737 C7.663 5.737 7 6.4 7 7.211 L7 17.526 C7 18.337 7.663 19 8.474 19 L18.789 19 C19.6 19 20.263 18.337 20.263 17.526 L20.263 13.105 18.789 13.105 Z M15.842 16.053' fill='%23ffffff' fill-opacity='1' stroke='none'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A")`,
      backgroundSize: '95px',
    },
  }
}));

/**
 * A Slide combines all the components for a given slide. It does not apply a theme. In the Lightbox, the Slide component
 * takes care of calculating slide overflow and resizing the font scaling used on the slide (and this gets written back
 * to the content state).
 */
export default function LightboxSlide({
  readOnly = false,
  aspect,
  branding,
  slide,
  className,
  remixName,
  width: fixedWidth,
  theme,
  paletteOverrideClasses,
  getSize,
  operations,
  slideIndex,
  style = {},
}) {

  const {
    focusOnClick,
    swapElements,
    setFontScaling,
    onImageDrop,
    editor,
  } = operations;

  let { ref: resizeRef, width } = useDimensions();
  if (fixedWidth) {
    resizeRef = () => {}; // no-op ref
    width = fixedWidth;
  }
  const calculateFontScaling = (setFontScaling !== undefined);
  const [scalingLastModified, setScalingLastModified] = useState();
  const [scalingFactor, setScalingFactor] = useState(DEFAULT_SCALING);
  const [fontSize, setFontSize] = useState(0);
  const [needsCalculating, setNeedsCalculating] = useState(false);
  const [slideOverlay, setSlideOverlay] = useState(false);
  const overlayStyles = useCallback(styles(), []);
  const classes = overlayStyles();
  const onDrop = swapElements;

  if (!remixName) {
    remixName = chooseRemix(slide);
  }
  const remix = RemixEngine.instance.get(remixName);
  const markupBuilder = readOnly ? new SlideMarkupBuilder() : new EditableSlideMarkupBuilder(onDrop, remix, editor);
  const slideHash = hashForSlide(slide);

  // Reset the font scaling when the slide changes (content or width, or both).
  useEffect(() => {
    if (slide && width > 0) {
      const timeStamp = slide ? slide.timeStamp : undefined;
      const hasModified = calculateFontScaling && (scalingLastModified && timeStamp !== scalingLastModified);
      let slideScaling = DEFAULT_SCALING;
      if (!hasModified && slide.settings[SCALING]) {
        slideScaling = slide.settings[SCALING] || DEFAULT_SCALING;
        logger.trace(`Slide ${slide.id} has not been modified - using stored slide scaling ${slideScaling}`);
        setNeedsCalculating(false);
      } else {
        if (!slide.settings[SCALING]) {
          logger.trace(`Slide ${slide.id} has no scaling - resetting slide scaling`);
        } else {
          logger.trace(`Slide ${slide.id} has been modified - resetting slide scaling`);
        }

        setNeedsCalculating(true);
      }
      setScalingFactor(slideScaling); // reset the font scaling when the width changes
      setScalingLastModified(timeStamp);
      setFontSize(fontSizeFromWidth(width, slideScaling));
    }
  }, [slideHash, width]);

  // elements that should be rendered on the slide
  const elements = (slide !== undefined && slide.markup !== undefined) ? markupBuilder.build(slide, focusOnClick !== undefined ? focusOnClick(slideIndex) : undefined) : [];

  const styleKey = paletteOverrideKey(slide);
  if (!paletteOverrideClasses) {
    const style = {};
    style[styleKey] = getPaletteOverride(slide, theme, branding);
    paletteOverrideClasses = makeStyles(style, { meta: `slide-${slide.id}` })();
  }

  const calculateScalingRef = useCallback(
    calculateScaling(
      slide,
      needsCalculating,
      setNeedsCalculating,
      scalingFactor,
      setScalingFactor,
      scalingLastModified,
      setScalingLastModified,
      width,
      fontSize,
      setFontSize,
      getSize,
      setFontScaling,
    ),[slideHash, scalingFactor, scalingLastModified, setScalingLastModified, width, fontSize, needsCalculating]
  );

  const hasOverflow = scalingFactor <= MIN_SCALING;
  const overflowRef = calculateFontScaling ? calculateScalingRef : () => {};
  const aggregateClassName = `${className} ${paletteOverrideClasses[styleKey] ? paletteOverrideClasses[styleKey] : ''}`;
  const aggregateSlideClassName = `slide${hasOverflow ? ' overflow' : ''} ${remixName || ""} slide-${slide.id}`;
  const slideDimensions = {
    width,
    height: fixedAspectHeight(width, aspect),
  };

  const { getRootProps } = useDropzone({
    maxSize: IMAGE_MAX_SIZE,
    onDrop: (acceptedFiles, rejectedFiles) => onDropImage(slide, setSlideOverlay, onImageDrop, acceptedFiles, rejectedFiles),
    onDragEnter: () => { setSlideOverlay(true); },
    onDragLeave: () => { setSlideOverlay(false); },
    accept: ACCEPTED_IMAGE_TYPES,
  });

  const dragProps = !readOnly ? getRootProps() : {};
  return (
    <SlideDimensionsContext.Provider value={slideDimensions}>
      <div ref={resizeRef} className={`${aggregateClassName} ${slideOverlay && classes.overlay}`} style={{ ...style, fontSize, height: slideDimensions.height }} {...dragProps}>
        <div ref={overflowRef} className={aggregateSlideClassName}>
          <div className="deck-logo-container"><div className="deck-logo-container-inner" /></div>
          {elements}
          <div className="hook" />
        </div>
      </div>
    </SlideDimensionsContext.Provider>
  );
}
