import { SLIDE_BREAK } from "./type";

export const deserializeSlideBreak = () => ({
  element: {
    HR: () => ({ type: SLIDE_BREAK }),
  },
});
