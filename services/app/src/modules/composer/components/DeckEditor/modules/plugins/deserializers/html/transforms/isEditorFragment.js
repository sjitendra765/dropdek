import { EDITOR_ELEMENT_CLASS, EDITOR_ELEMENT_CONTENT_CLASS } from "../../../../gutter/renderElementWithGutter";
import { SLIDE_ELEMENT_CLASS } from "../../../component/slide/components";
import { SLIDE_BREAK_ELEMENT_CLASS } from "../../../component/slideBreak/components";

export const isEditorFragment = (body) => {
  if (!body.childNodes) {
    return false;
  }
  const { childNodes } = body;
  for (let i = 0; i < childNodes.length; i++) {
    const node = childNodes[i];
    if (node) {
      const { nodeName, className } = node;
      if (nodeName === 'DIV' && (
        className.indexOf(EDITOR_ELEMENT_CLASS) >= 0 ||
        className.indexOf(EDITOR_ELEMENT_CONTENT_CLASS) >= 0 ||
        className === SLIDE_ELEMENT_CLASS ||
        className.indexOf(SLIDE_BREAK_ELEMENT_CLASS) >= 0)) {

        return true;
      }
    }
  }
  return false;
};
