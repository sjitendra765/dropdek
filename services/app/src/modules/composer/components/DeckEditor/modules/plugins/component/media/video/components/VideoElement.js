import React from 'react';
import { useEditor } from "slate-react";
import { useTheme } from '@material-ui/core';
import { EditorTransforms } from "../../../../../../services/transforms/EditorTransforms";
import { imageComposerStyles, imageWrapperStyles } from "../../MediaStyles";

export const VideoElement = (props) => {
  const { element, children } = props;
  const editor = useEditor();
  const selected = EditorTransforms.isSelected(editor, element);
  const theme = useTheme();

  if (element.settings) {
    const { thumbnail } = element.settings;
    if (thumbnail !== undefined) {
      return (
        <div style={imageComposerStyles(selected, theme)}>
          <div style={imageWrapperStyles(thumbnail)}>
            {children}
          </div>
        </div>
      );
    }
  }
  return <div>{children}</div>;
};
