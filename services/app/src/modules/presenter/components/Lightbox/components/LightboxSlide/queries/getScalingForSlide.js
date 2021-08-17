import { getScalingFromSettings } from "./getScalingFromSettings";

export const getScalingForSlide = (slide, themeId) => getScalingFromSettings(slide.settings, themeId);
