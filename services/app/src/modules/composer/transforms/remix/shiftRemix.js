import { nextRemix } from "../../../../common/slide/transforms/nextRemix";

export const shiftRemix = (editor) => (slide, currentRemix, offset) => {
  const newRemixName = nextRemix(currentRemix, slide.matchingRemixes, offset);
  editor.settings(slide.path).set('remix', newRemixName);
};

export const setRemix = (editor) => (slide, remixName) => {
  editor.settings(slide.path).set('remix', remixName);
};
