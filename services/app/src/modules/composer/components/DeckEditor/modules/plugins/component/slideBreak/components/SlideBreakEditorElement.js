/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import { useEditor } from "slate-react";
import { EditorTransforms } from "../../../../../services/transforms/EditorTransforms";
import { toggleSelection } from "../../media/components/UnselectMedia";

export const SLIDE_BREAK_ELEMENT_CLASS = "slide-break";

export const SlideBreakEditorElement = ({ attributes, children, element }) => {
  const editor = useEditor();
  const selected = EditorTransforms.isSelected(editor, element);
  const selectedClass = selected ? 'selected' : '';
  const styles = {
    cursor: 'pointer',
    caretColor: 'transparent', // Note: We need an IE/Edge replacement for this property
  };
  return <div style={styles} className={`${SLIDE_BREAK_ELEMENT_CLASS} ${selectedClass}`} {...attributes} onMouseDown={(e) => { toggleSelection(e, editor, selected); }}>{children}</div>;
};
