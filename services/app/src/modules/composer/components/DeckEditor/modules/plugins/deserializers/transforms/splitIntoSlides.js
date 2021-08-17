import { newSlide } from "../../slide/transforms/newSlide";
import { isHeading } from "./isHeading";
import { summarise } from "./summarise";
import { ensureNotEmpty } from "./ensureNotEmpty";
import { SLIDE } from "../../component/slide/type";
import { SLIDE_BREAK } from "../../component/slideBreak/type";
import { HEADING_ONE } from "../../component/heading/one/type";
import { HEADING_TWO } from "../../component/heading/two/type";

export const splitIntoSlides = (fragment, splitContent) => {
  if (!fragment) {
    return fragment;
  }

  const slides = [];
  let buffer = [];
  let previousNode;
  let prevNodeLevel = 0;
  fragment.forEach((node) => {
    if (node.type === SLIDE) {
      slides.push(node);
    } else {
      if (shouldSplit(node, buffer, splitContent, prevNodeLevel)) {
        slides.push(newSlide(summarise(ensureNotEmpty(buffer))));
        buffer = [];
      }

      prevNodeLevel = headingLevel(node);
      previousNode = node;
      if (!isSlideBreak(node)) { // we dont' want slide break elements on a slide!
        buffer.push(node);
      }
    }
  });

  // Boundary case.
  if (buffer.length > 0 || (previousNode && isSlideBreak(previousNode))) {
    slides.push(newSlide(summarise(ensureNotEmpty(buffer))));
  }

  return slides;
};

const shouldSplit = (node, buffer, splitContent, prevNodeLevel) => (
  isSlideBreak(node) || (splitContent && isHeading(node) && buffer.length > 0 && headingLevel(node) >= prevNodeLevel));

const isSlideBreak = (node) => node && node.type === SLIDE_BREAK;

const headingLevel = (node) => {
  switch (node.type) {
    case HEADING_ONE: return 2;
    case HEADING_TWO: return 1;
    default: return 0;
  }
};
