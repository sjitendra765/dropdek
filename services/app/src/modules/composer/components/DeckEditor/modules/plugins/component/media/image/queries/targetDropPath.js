import { SlideTransforms } from "../../../../../../services/transforms/SlideTransforms";

const siblingIndex = (element) => Array.from(element.parentNode.children).indexOf(element);

export const targetDropPath = (editor, editorElement) => {
  const slideElement = editorElement.parentNode?.parentNode;
  if (slideElement) {
    const slideId = slideElement.getAttribute("data-id");
    if (slideId) {
      const slideIndex = 2 * SlideTransforms.getIndexOfSlide(editor, slideId);
      const elementIndex = siblingIndex(editorElement);
      if (elementIndex >= 0) {
        const path = [slideIndex, elementIndex];
        return path;
      }
    }
  }
};
