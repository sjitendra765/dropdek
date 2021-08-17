import React, { useRef } from 'react';
import { ReactEditor, useEditor } from "slate-react";
import { Path, Transforms } from "slate";
import { Backspace } from "@material-ui/icons";
import { EditorTransforms } from "../../services/transforms/EditorTransforms";
import { useHighlightedPath } from "../../../../hooks/highlighted/useHighlightedPath";
import { LightningBoltIcon } from "../plugins/component/LightningBoltIcon";
import { DraggableEditorElement } from "./components/DraggableEditorElement";
import { showSuggestionControls } from "../plugins/suggestions/transforms/showSuggestionControls";
import { useEditorOperations } from "../../hooks/useEditorOperations";

export const EDITOR_ELEMENT_CLASS = "editorElement";
export const EDITOR_ELEMENT_CONTENT_CLASS = "elementContent";
export const EDITOR_ELEMENT_OPTIONS = "elementOptions";
export const EDITOR_ELEMENT_DROPLINE = "dropLine";
export const EDITOR_ELEMENT_DROPLINE_INACTIVE = "inactive";

export const renderElementWithGutter = (renderElement, icon, typeP) => (props) => {
  const element = renderElement(props);

  if (element) {
    const operations = useEditorOperations();
    const {
      setMatch,
    } = operations;

    const editor = useEditor();
    const highlightedPath = useHighlightedPath();
    const readOnly = ReactEditor.isReadOnly(editor);
    const node = props.element;
    const containsSelection = EditorTransforms.isSelected(editor, node);
    const clicked = EditorTransforms.isClicked(editor, node);
    const path = ReactEditor.findPath(editor, node);

    let handleClick;

    let gutterIcon = icon;
    if (clicked && (node.type === typeP && EditorTransforms.isNodeEmpty(editor, node) || EditorTransforms.isSlideEmpty(editor, EditorTransforms.currentSlide(editor)[0]))) {
      handleClick = (evt) => {
        showSuggestionControls(editor, setMatch, path, evt.currentTarget);
        ReactEditor.focus(editor);
      };
      gutterIcon = <LightningBoltIcon/>;
    } else {
      handleClick = (evt) => {
        showSuggestionControls(editor, setMatch, path, evt.currentTarget, [
          {
            label: "Delete",
            icon: <Backspace style={{
              fontSize: "1.1em",
              marginLeft: 8,
              marginRight: 5,
              marginBottom: 1
            }}/>,
            handler: () => Transforms.removeNodes(editor, {
              at: path,
              hanging: true
            })
          }
        ]);
      };
    }

    const ref = useRef();
    if (path && EditorTransforms.isComponentElementPath(editor, path)) {
      const highlighted = highlightedPath && Path.equals(path, highlightedPath);
      return (
        <DraggableEditorElement
          readOnly={readOnly}
          path={path}
          componentRef={ref}
          highlighted={highlighted}
          selected={containsSelection}
          clicked={clicked}
          gutterIcon={gutterIcon}
          handleClick={handleClick}
          nodeType={node.type.toLowerCase()}
        >
          {element}
        </DraggableEditorElement>
      );
    }
    return element;
  }
  return null;
};
