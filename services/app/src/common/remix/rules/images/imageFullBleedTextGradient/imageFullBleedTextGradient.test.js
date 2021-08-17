import { toSlide } from "../../../utils/testUtils";
import { imageFullBleedTextGradientRemix } from "./imageFullBleedTextGradientRemix";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { NUMBERED_LIST } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/list/numbered/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with text or list and one image', () => {
  expect(imageFullBleedTextGradientRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, IMAGE))).toBeTruthy();
  expect(imageFullBleedTextGradientRemix.matches(toSlide(HEADING_ONE, NUMBERED_LIST, IMAGE))).toBeTruthy();
  expect(imageFullBleedTextGradientRemix.matches(toSlide(IMAGE))).toBeFalsy();
  expect(imageFullBleedTextGradientRemix.matches(toSlide(IMAGE, PARAGRAPH))).toBeTruthy();
  expect(imageFullBleedTextGradientRemix.matches(toSlide(HEADING_ONE, IMAGE, PARAGRAPH))).toBeTruthy();
});
