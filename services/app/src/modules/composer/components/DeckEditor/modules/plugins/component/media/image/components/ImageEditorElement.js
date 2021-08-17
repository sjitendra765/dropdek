/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { useTheme } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from 'react';
import { Transforms } from 'slate';
import { ReactEditor, useEditor } from "slate-react";
import Unsplash from "../../../../../../../../../../common/api/sdk/services/Unsplash";
import { logger } from "../../../../../../../../../../common/util/logger";
import { EditorTransforms } from "../../../../../../services/transforms/EditorTransforms";
import { SelectionTransforms } from "../../../../../../services/transforms/SelectionTransforms";
import ImageBox from '../../components/ImageElement';
import MediaGrid from '../../components/MediaGrid/MediaGrid';
import { toggleSelection } from '../../components/UnselectMedia';
import UnsplashFooter from '../../components/UnsplashFooter/UnsplashFooter';
import { imageComposerStyles, imageWrapperStyles, replaceButtonStyles } from "../../MediaStyles";
import { ERROR } from "../status";
import { getUrl } from "../transforms/imageTransforms";
import { FROM_UPLOAD, insertImage } from '../transforms/insertImage';
import { uploadFiles } from '../transforms/uploadFiles';
import { processUnsplashResults } from "../transforms/processUnsplashResults";

const buildFileSelector = (handleFileUpload) => () => {
  const fileSelector = document.createElement('input');
  fileSelector.setAttribute('type', 'file');
  fileSelector.setAttribute('accept', 'image/jpeg, image/png, image/gif');
  fileSelector.onchange = handleFileUpload;
  return fileSelector;
};

export const FROM_UNSPLASH = "unsplash";

export const ImageEditorElement = (props) => {
  const { element, children, attributes } = props;
  const { settings } = element;
  const query = settings?.label;
  const editor = useEditor();
  const path = ReactEditor.findPath(editor, element);
  const selected = EditorTransforms.isSelected(editor, element);
  const url = getUrl(element);
  const [showUnsplashModal, setUnsplashModal] = useState(false);
  const [fileSelector, setfileSelector] = useState('');

  const theme = useTheme();
  const mediaElementStyles = replaceButtonStyles()();

  const updateImage = (event) => {
    if (settings.from === FROM_UNSPLASH) {
      setUnsplashModal(true);
    }
    if (settings.from === FROM_UPLOAD) {
      fileSelector.click();
    }
  };

  const onSubmit = (image, query) => {
    processUnsplashResults(image, query)
      .then((imageNodes) => {
        Transforms.removeNodes(editor,{ at: path });
        Transforms.insertNodes(editor, imageNodes, { at: path, select: true });
      });
  };
  
  const onCancel = () => {
    setUnsplashModal(false);
  };

  useEffect(() => {
    if (settings.from !== FROM_UNSPLASH) {
      setfileSelector(buildFileSelector(handleFileUpload));
    }
  }, []);

  const handleFileUpload = (event) => {
    const { files } = event.target;
    const pathUrl = window.location.href;
    const deckId = pathUrl.slice(pathUrl.lastIndexOf('/') + 1);
    const path = SelectionTransforms.componentElementPath(editor);
    if (files && files.length > 0) {
      uploadFiles(deckId, files, {
        process: (url, name, { swatch }) => insertImage(editor, url, name, swatch),
        onSuccess: () => {
          Transforms.removeNodes(editor, { at: path });
        },
        onError: () => logger.error(ERROR),
        clearTimeout: () => logger.error(null)
      });
    }
  };

  if (url !== undefined) {
    return (
      <div className={`${mediaElementStyles.imageContainer} ${selected && "active"}`}>
        <div className={mediaElementStyles.image} style={imageComposerStyles(selected, theme)}>
          {(showUnsplashModal) ? (
            <MediaGrid
              maxImages={10}
              service={Unsplash}
              onSelectImage={(image, query) => onSubmit(image, query)}
              onCancel={onCancel}
              query={query}
              node={element}
              footer={<UnsplashFooter/>} update>
              <ImageBox />
            </MediaGrid>
          ) : ''}
          <div style={imageWrapperStyles(url)} {...attributes} onMouseDown={(event) => toggleSelection(event, editor, selected)} aria-hidden="true">
            {children}
          </div>
        </div>
        <div contentEditable={false} className="replace-container">
          <Button onClick={() => updateImage()} variant="text" size="small">
            Replace Image
          </Button>
        </div>
      </div>
    );
  }
  return <div {...attributes}>{children}</div>;
};
