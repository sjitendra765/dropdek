import { Editor } from "slate";
import { uploadFiles } from "./uploadFiles";
import { FROM_UPLOAD, insertImage } from "./insertImage";
import { logger } from "../../../../../../../../../../common/util/logger";

export const dragImageOnSlide = (editor, deckId) => (slide, files) => {
  const slidePath = slide.path;
  const [slideNode] = Editor.node(editor, slidePath);
  if (slideNode) {

    // We append the image at the end of the target slide.
    const targetPath = [slidePath[0], slideNode.children.length - 1];
    uploadFiles(
      deckId,
      files, {
        process: (url, name, { swatch }) => insertImage(editor, url, name, swatch, FROM_UPLOAD, { at: targetPath }),
        onError: (e) => logger.error(`Error when uploading an image to ${targetPath}`, e)
      }
    );
  } else {
    logger.error(`Invalid slide path ${slidePath} for dropping an image`);
  }

};
