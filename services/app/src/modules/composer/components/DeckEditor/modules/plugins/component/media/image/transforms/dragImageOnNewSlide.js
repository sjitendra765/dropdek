import { Editor } from "slate";
import { ReactEditor } from "slate-react";
import { uploadFiles } from "./uploadFiles";
import { EditorTransforms } from "../../../../../../services/transforms/EditorTransforms";
import { DropType } from "../../../../../../../../../presenter/components/Lightbox/components/LightboxDropZone/LightboxDropZone";
import { newImage } from "./newImage";

export const dragImageOnNewSlide = (editor, deckId) => async (dropType, slide, files) => {
  if (dropType === DropType.singleSlide) {
    const insertPosition = slide ? EditorTransforms.getIndexOfSlide(editor, slide.id) + 1 : 0;
    uploadFiles(deckId, files, {
      processMany: (files) => {
        const imageNodes = files.map((file) => newImage(file));
        editor.insertSlide({ position: insertPosition, children: imageNodes });
        ReactEditor.focus(editor);
      },
    });
  } else if (dropType === DropType.multipleSlides) {
    let insertPosition = slide ? EditorTransforms.getIndexOfSlide(editor, slide.id) + 1 : 0;
    uploadFiles(deckId, files, {
      processMany: (files) => {
        files.forEach((file) => {
          Editor.withoutNormalizing(editor, () => {
            const imageNode = newImage(file);
            editor.insertSlide({ position: insertPosition, children: [imageNode] });
            insertPosition++;
          });
          ReactEditor.focus(editor);
        });
      },
    });
  }
};
