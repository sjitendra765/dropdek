import { DEFAULT_SCALING } from "../../../../Slide/scalingLimits";

const max = (a, b) => (a > b ? a : b);

/**
 * Calculate a font size (with 2 decimal points) based on the slide width and scaling factor.
 *
 * @param slideWidth width of the slide container.
 * @param fontScaling scaling factor for relative up/down scaling.
 * @returns number size based on the given slide width and scaling.
 */
export const fontSizeFromWidth = (slideWidth, fontScaling = DEFAULT_SCALING) => max(1, Math.round(slideWidth * fontScaling)) / 100;
