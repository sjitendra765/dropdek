import React, { useRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import useMergedRef from "@react-hook/merged-ref";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import {
  EDITOR_ELEMENT_CLASS,
  EDITOR_ELEMENT_CONTENT_CLASS,
  EDITOR_ELEMENT_DROPLINE,
  EDITOR_ELEMENT_DROPLINE_INACTIVE,
  EDITOR_ELEMENT_OPTIONS,
} from "../renderElementWithGutter";
import { useDndBlock } from "../../plugins/dnd/hooks";

const showGutterIcon = (icon, handleClick, nodeType, readOnly, multiDragRef) => {
  if (readOnly) {
    return (
      <IconButton className={`icon type-${nodeType}`}>
        {icon}
      </IconButton>
    );
  }
  return (
    <IconButton onClick={handleClick} className={`icon type-${nodeType}`} ref={readOnly ? () => {} : multiDragRef} onMouseDown={(e) => e.stopPropagation()} disabled={readOnly}>
      {icon}
    </IconButton>
  );
};

export const DraggableEditorElement = ({ readOnly = false, componentRef, path, highlighted, selected, clicked, gutterIcon, handleClick, nodeType, children }) => {

  const fixedSelectionStyles = {
    pointerEvents: 'auto',
    userSelect: 'none'
  };

  const blockRef = useRef(null);
  const rootRef = useRef(null);
  const multiRootRef = useMergedRef(componentRef, rootRef);
  const dragWrapperRef = useRef(null);
  const { dropLine, dragRef, isDragging } = useDndBlock({
    path,
    blockRef: rootRef,
  });
  const multiDragRef = useMergedRef(dragRef, dragWrapperRef);
  const dropLineClassName = `${EDITOR_ELEMENT_DROPLINE} ${!dropLine ? EDITOR_ELEMENT_DROPLINE_INACTIVE : dropLine}`;
  return (
    <React.Fragment>
      <div className={`${EDITOR_ELEMENT_CLASS}${highlighted ? ' highlighted' : ''}`} ref={multiRootRef}>

        <div className={dropLineClassName} contentEditable={false} data-path={JSON.stringify(path)} />

        <div
          className={`${EDITOR_ELEMENT_OPTIONS}${selected ? ' selected' : ''}${clicked ? ' clicked' : ''}`}
          contentEditable={false} style={fixedSelectionStyles}>

          {gutterIcon && gutterIcon !== null ? showGutterIcon(gutterIcon, handleClick, nodeType, readOnly, multiDragRef) : null}
        </div>
        <div className={EDITOR_ELEMENT_CONTENT_CLASS} ref={blockRef}>
          { children }
        </div>
      </div>
    </React.Fragment>
  );
};
