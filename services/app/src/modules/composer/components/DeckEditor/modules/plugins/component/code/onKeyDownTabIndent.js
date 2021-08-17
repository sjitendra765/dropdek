import { isKeyHotkey } from "is-hotkey";
import { Editor, Transforms } from "slate";
import { EditorTransforms } from "../../../../services/transforms/EditorTransforms";
import { CODE } from "./type";

const isShiftTabHotKey = (event) => isKeyHotkey('Shift+Tab')(event);
const isTabHotKey = (event) => isKeyHotkey('Tab')(event);

export const onKeyDownTabIndent = (type) => (event, editor) => {
  if (isTabHotKey(event)) {
    const [element,] = EditorTransforms.containerAncestor(editor);
    if (element && element.type && element.type === type) {
      const insertTab = "\t";
      editor.insertText(insertTab);
    }
  } else if (isShiftTabHotKey(event)) {
    const [element,] = EditorTransforms.containerAncestor(editor);
    if (element && element.type && element.type === type) {
      const range = window.getSelection().getRangeAt(0);
      if (range.collapsed) {
        let text = range.startContainer.textContent.substring(0, range.startOffset);
        text = text.split("\n");
        if (text[text.length - 1][0] === "\t") {
          const newText = text[text.length - 1].slice(1);
          for (let i = text[text.length - 1].length - 1; i >= 0; i--) {
            editor.deleteBackward();
          }
          editor.insertText(newText);
        }
      }
    }
  }
};

export const onKeyDownTabs = (event, editor) => {
  if (isTabHotKey(event) || isShiftTabHotKey(event)) event.preventDefault();
};
