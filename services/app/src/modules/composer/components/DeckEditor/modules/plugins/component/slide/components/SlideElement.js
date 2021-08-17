import { ClickAwayListener } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { Delete } from "@material-ui/icons";
import React, { useEffect, useState } from 'react';
import useDimensions from "react-cool-dimensions";
import { HiCog } from "react-icons/hi";
import { ImMagicWand } from "react-icons/im";
import { IoDuplicate } from "react-icons/io5";
import { ReactEditor, useEditor } from "slate-react";
import TemplateService from "../../../../../../../../../common/api/plugins/template/TemplateService";
import { encodeStructure } from "../../../../../../../../../common/api/plugins/template/transforms/encodeStructure";
import { slideStructure } from "../../../../../../../../../common/api/plugins/template/transforms/slideStructure";
import { TemplateMenu } from "../../../../../components/template/TemplateMenu/TemplateMenu";
import { useTemplateMenuControls } from "../../../../../hooks/useTemplateMenuControls";
import { EditorTransforms } from "../../../../../services/transforms/EditorTransforms";
import { SelectionTransforms } from "../../../../../services/transforms/SelectionTransforms";
import { SlideTransforms } from "../../../../../services/transforms/SlideTransforms";
import { splitSlide } from "../../../slide/splitSlide";
import NewSlideButton from "./NewSlideButton";
import { SlideControlButton, slideControlIconStyle } from "./SlideControlButton";

export const SLIDE_ELEMENT_CLASS = "editorSlide";

export const SlideElement = ({ children, element }) => {

  const editor = useEditor();
  const templateMenuControls = useTemplateMenuControls() || {};
  const {
    themeName,
    themeClasses,
    templateMenuClasses,
    applyTemplate,
    templateMenuSlideId,
    showTemplateGrid,
    setShowTemplateGrid,
    toggleTemplateMenu,
    closeTemplateMenu,
    user,
  } = templateMenuControls;

  const split = splitSlide(editor, toggleTemplateMenu);
  const readOnly = ReactEditor.isReadOnly(editor);
  const slideElementPath = ReactEditor.findPath(editor, element);
  const splitLocation = SelectionTransforms.lastLocation(editor, slideElementPath);
  const slideId = element.id;
  const shouldShowTemplateMenu = templateMenuSlideId && templateMenuSlideId === slideId;

  const deleteSlide = () => SlideTransforms.deleteSlide(editor, slideId);

  const duplicateSlide = () => SlideTransforms.duplicateSlide(editor, slideId);

  const isActiveSlide = () => {
    const current = EditorTransforms.currentSlide(editor);
    if (current !== undefined && current.length > 0 && current[0] !== undefined) {
      return slideId === current[0].id;
    }
    return false;
  };

  const scaling = () => {
    if (element && element.settings && element.settings.scaling) {
      return element.settings.scaling;
    }
    return 10;
  };

  const ControlMode = {
    Compact: "compact",
    Full: "full"
  };

  const [controlMode, setControlMode] = useState(ControlMode.Compact);

  const { ref, height, width } = useDimensions();

  useEffect(() => {
    if (height < 94) {
      if (controlMode !== ControlMode.Compact) {
        setControlMode(ControlMode.Compact);
      }
    } else if (controlMode !== ControlMode.Full) {
      setControlMode(ControlMode.Full);
    }
  }, [height]);

  const [showCompactMenu, setShowCompactMenu] = useState(false);

  const toggleCompactModeMenu = () => {
    setShowCompactMenu(!showCompactMenu);
  };

  const [hasMatches, setHasMatches] = useState(false);
  const slideEncoding = encodeStructure(slideStructure(element));
  const templateService = TemplateService.instance();

  const [anchorEl, setAnchorEl] = useState(null);
  const toggleMagicDrawer = (show) => {
    setAnchorEl(anchorEl || !show ? null : ref.current);
    if (!anchorEl || show) {
      ref.current.classList.add("magic-drawer-open");
    } else {
      ref.current.classList.remove("magic-drawer-open");
    }
  };

  useEffect(() => {
    const matches = templateService.search('', slideEncoding);
    if (matches && matches.length > 0) {
      setHasMatches(true);
    } else {
      setHasMatches(false);
      toggleMagicDrawer(false);
    }
  }, [slideEncoding]);

  useEffect(() => {
    toggleMagicDrawer(shouldShowTemplateMenu);
  }, [shouldShowTemplateMenu]);

  const clickAwayHandler = () => {
    toggleMagicDrawer(false);
  };

  return (
    <div
      className={`${SLIDE_ELEMENT_CLASS} ${isActiveSlide() ? "selected" : ""} ${anchorEl && "magic-drawer-open"}`}
      data-id={slideId}>
      <ClickAwayListener onClickAway={clickAwayHandler}>
        <div ref={ref} className={`slide-area control-mode-${controlMode}`}>
          <ClickAwayListener onClickAway={() => setShowCompactMenu(false)}>

            <div className={`slide-controls control-mode-${controlMode} ${showCompactMenu ? "compact-mode-open" : ""} ${isActiveSlide() ? "active" : "" }`} contentEditable={false}>
              <div className={`slide-number ${isActiveSlide() && "active"}`} contentEditable={false}/>
              <span className="options">
                <IconButton size="small" onClick={toggleCompactModeMenu}><HiCog style={slideControlIconStyle}/></IconButton>
              </span>
              <div className={`control-actions-outer control-mode-${controlMode}`} contentEditable={false}>
                <div className="control-actions-inner">
                  <SlideControlButton onClick={duplicateSlide} icon={<IoDuplicate style={slideControlIconStyle}/>} style={{ }}/>
                  <SlideControlButton onClick={deleteSlide} icon={<Delete style={slideControlIconStyle}/>}/>
                  <SlideControlButton style={{ overflow: "hidden" }} icon={<ImMagicWand style={{ overflow: "hidden", transform: "scaleX(-1) scale(1.4)", top: 3, left: -3, position: "relative" }}/>} size="small" className={`magic-wand ${hasMatches && "active"}`} disabled={!hasMatches} onClick={hasMatches ? toggleMagicDrawer : undefined}/>
                </div>
              </div>
            </div>
          </ClickAwayListener>
          <div className="slide-content">
            {children}
          </div>
        </div>
      </ClickAwayListener>

      <TemplateMenu
        showInitially={showTemplateGrid}
        setShowInitially={setShowTemplateGrid}
        popupAnchor={anchorEl}
        setPopupAnchor={setAnchorEl}
        popupWidth={width}
        toggleMagicDrawer={toggleMagicDrawer}
        closeMenu={closeTemplateMenu}
        templateMenuClasses={templateMenuClasses}
        themeClasses={themeClasses}
        applyTemplate={(template) => applyTemplate(template, slideElementPath)}
        node={element}
        themeName={themeName}
        user={user}
        path={slideElementPath}
      />

      {splitLocation && !readOnly ?
        <NewSlideButton splitSlide={split} scaling={scaling()} splitLocation={splitLocation}/> : null}
    </div>
  );
};
