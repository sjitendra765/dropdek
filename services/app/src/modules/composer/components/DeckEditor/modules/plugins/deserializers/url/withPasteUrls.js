import React from 'react';
import { SelectionTransforms } from "../../../../services/transforms/SelectionTransforms";
import { isURL } from "./transforms/isUrl";
import { logger } from "../../../../../../../../common/util/logger";
import { processUrlPaste } from "./processUrlPaste";
import { hasActivePrompt } from "../../../prompt/transforms/hasActivePrompt";
import { UrlSmartPasteComponent } from "./components/UrlSmartPasteComponent";

export const withPasteUrls = (plugins, setPasteHandler) => (editor) => {
  const { insertData } = editor;

  editor.insertData = (data) => {

    const [targetNode, targetPath] = SelectionTransforms.componentElement(editor);

    // If active prompt session then we just insert plain text.
    const { promptSession } = editor;
    if (promptSession && promptSession !== null) {
      if (hasActivePrompt(targetNode, targetPath, promptSession)) {
        logger.debug(`Active prompt session - don't parse clipboard`);
        insertData(data);
        return;
      }
    }

    const url = data.getData('text/plain');
    if (url) {
      const validUrl = isURL(url);
      if (validUrl) {
        const setPasteComponent = (component) => {
          setPasteHandler({
            component,
            data: url,
            targetRange: editor.selection,
          });
        };
        if (processUrlPaste(plugins)(url, setPasteComponent)) {
          return; // success
        }

        // We didn't find a specific plugin to process the URL, so we try to scrape the link.
        setPasteComponent(UrlSmartPasteComponent);
        return;
      }
    }
    insertData(data);
  };

  return editor;
};
