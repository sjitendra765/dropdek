import { useTheme } from "@material-ui/core";
import debounce from "lodash.debounce";
import useDimensions from "react-cool-dimensions";
import Card from "@material-ui/core/Card";
import HandleIcon from '@material-ui/icons/DragIndicator';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import React, { useEffect, useState } from "react";
import { SortableHandle } from 'react-sortable-hoc';
import Popup from "../../../../../../common/components/popup/Popup";
import { chooseRemix } from "../../../../../../common/slide/transforms/chooseRemix";
import LightboxSlideContainer from "../LightboxSlide/LightboxSlideContainer";
import RemixPreview from "./RemixPreview";
import SlideToolbar from "./SlideToolbar";
import Colors from "../../../../../../Colors";
import { getPaletteForSlide } from "../../../../../../common/slide/transforms/palette/getPaletteForSlide";
import { logger } from "../../../../../../common/util/logger";
import { HOVERING_SLIDE_CLASS } from "../../Lightbox";

const cardStyle = {
  boxShadow: "rgba(50, 50, 93, 0.085) 0px 0px 0px 0.05em",
};

export const SlidePanel = ({
  slide,
  aspect,
  index,
  cols,
  variant,
  readOnly,
  setFontScaling,
  operations,
  themePackage,
  square,
  metadata,
  branding,
  slideClasses,
  themeClasses,
  paletteOverrideClasses,
  remixPreviewClasses,
  toolbarClasses,
  deckId
}) => {

  const {
    shiftRemix,
    setRemix,
    pickPalette,
  } = operations;
  const [show, setShow] = useState(false);
  const [keepOpen, setKeepOpen] = useState(false);
  const { ref: resizeRef, width } = useDimensions();

  const t = useTheme();
  const colsForDrawer = cols > 1 ? Math.min(cols, 2) : 1;

  // Slight debounce on the calculation of the drawer width.
  const [drawerWidth, setDrawerWidth] = useState(0);
  useEffect(
    debounce(() => {
      const dw = colsForDrawer > 1 ? colsForDrawer * width + (colsForDrawer * spacing) : width;
      setDrawerWidth(dw);
    }, 100),
    [width, colsForDrawer]
  );

  const spacing = t.spacing(1.15);
  const remixName = chooseRemix(slide);
  const theme = themePackage.component;
  const palette = getPaletteForSlide(theme.id, slide.settings);

  const [originalRemix, setOriginalRemix] = useState();
  const [originalPalette, setOriginalPalette] = useState({});

  const Handle = SortableHandle(() => (
    <a href="#" className={`${toolbarClasses.dragHandle} dragHandle`}>
      <HandleIcon className={toolbarClasses.dragIcon} />
    </a>
  ));

  const revert = () => {
    logger.debug(`Reverting back to remix: ${originalRemix} and palette:\n${JSON.stringify(originalPalette)}`);
    setRemix(slide, originalRemix);
    pickPalette(slide, themePackage.component.id, originalPalette);
  };

  const open = () => {
    setShow(true);
  };

  const close = (immediate) => {
    if (!keepOpen || immediate === true) {
      setShow(false);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const o = Boolean(anchorEl);

  const handleClick = () => {
    if (!anchorEl) {
      setOriginalRemix(remixName);
      setOriginalPalette({ ...palette });
    }
    setAnchorEl(anchorEl ? null : resizeRef.current);
    setKeepOpen(!anchorEl);
  };

  const getAlignment = () => {
    if (index === 0 || index % cols === 0) {
      return "bottom-start";
    }
    if (index % cols === cols - 1) {
      return "bottom-end";
    }
    return "bottom";
  };

  const brandingToUse = branding && themePackage && themePackage.component.branded ? branding : undefined;
  return (
    <div key={`slide-panel-${slide.id}`} id={`slide-panel-${slide.id}`}>
      <ClickAwayListener onClickAway={() => close(true)}>
        <Card ref={resizeRef} onMouseOver={open} onDrag={close} onMouseLeave={close} className={`slide-card ${show ? HOVERING_SLIDE_CLASS : ""}`} variant={variant} square={square} elevation={0} style={cardStyle}>
          {
            !readOnly && show && <Handle classes={toolbarClasses} />
          }
          {!readOnly ? (
            <SlideToolbar
              show={show}
              setKeepOpen={setKeepOpen}
              metadata={metadata}
              shiftRemix={shiftRemix}
              themePackage={themePackage}
              slide={slide}
              deckId={deckId}
              index={index}
              classes={toolbarClasses}
              cols={cols}
              pickPalette={pickPalette}
              remixName={remixName}
              handleClick={handleClick}
              drawerOpen={anchorEl !== null}
            />
          ) : null }
          <LightboxSlideContainer
            key={`slide-${index}`}
            deckId={deckId}
            aspect={aspect}
            readOnly={readOnly}
            remixName={remixName}
            branding={branding && themePackage && themePackage.component.branded ? branding : undefined}
            theme={theme}
            operations={operations}
            slide={slide}
            width={width}
            slideIndex={index}
            className={slideClasses.slideRoot}
            paletteOverrideClasses={paletteOverrideClasses}
          />
          <Popup disableFlip disablePortal instant anchor={anchorEl} setAnchor={setAnchorEl} open={o} defaultPlacement={getAlignment()} color={Colors.dark.base.low} width={drawerWidth}>
            {anchorEl ? (
              <RemixPreview
                revert={revert}
                themeClasses={themeClasses}
                close={() => setAnchorEl(null)}
                slide={slide}
                setRemix={setRemix}
                pickPalette={pickPalette}
                deckId={deckId}
                setFontScaling={setFontScaling}
                branding={brandingToUse}
                themePackage={themePackage}
                remixPreviewClasses={remixPreviewClasses}
                width={drawerWidth}
                aspect={aspect}
              />
            ) : null}
          </Popup>
        </Card>
      </ClickAwayListener>
    </div>
  );
};
