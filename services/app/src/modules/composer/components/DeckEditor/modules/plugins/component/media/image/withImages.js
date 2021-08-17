import "./withImages.scss";

import { uploadFiles } from "./transforms/uploadFiles";
import { insertImage } from "./transforms/insertImage";

const blobUrlRegExp = new RegExp(/^blob:.+$/);
const isBlobUrl = (url) => url.match(blobUrlRegExp);

/**
 * Extends the editor by adding an `insertImage` function.
 *
 * @param editor Slate editor instance.
 */
export const withImages = (deckId) => (editor) => {

  editor.insertImage = (url, name) => insertImage(editor, url, name);

  /**
   * Process clipboard paste events.
   *
   * @param clipboardData data coming from paste event.
   */
  editor.insertClipboardData = (clipboardData, onSuccess, onError, clearTimeout) => {
    const { items } = clipboardData;
    const files = [];
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        // Skip content if not image
        const [mime] = item.type.split("/");
        if (!mime || mime !== "image") {
          return false;
        }

        // Retrieve image on clipboard as blob
        files.push(item.getAsFile());
      }
    }
    if (files.length > 0) {
      uploadFiles(deckId, files, {
        process: (url, name, { swatch }) => insertImage(editor, url, name, swatch),
        onSuccess,
        onError,
        clearTimeout
      });
      return true;
    }
    return false;
  };

  return editor;
};
