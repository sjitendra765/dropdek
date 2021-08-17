import { getRenderElement } from "@udecode/slate-plugins";
import { SlideBreakEditorElement } from "./components/SlideBreakEditorElement";
import { SLIDE_BREAK } from "./type";

export const renderElementSlideBreak = getRenderElement({
  type: SLIDE_BREAK,
  component: SlideBreakEditorElement,
});
