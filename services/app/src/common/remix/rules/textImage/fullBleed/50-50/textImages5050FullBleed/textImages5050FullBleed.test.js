import { toSlide, toSlideRelativeTo } from "../../../../../utils/testUtils";
import { textImages5050FullBleedRemix } from "./textImages5050FullBleed";
import { IMAGE } from "../../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { PARAGRAPH } from "../../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with plain text and 1-4 images', () => {
  const fallback = textImages5050FullBleedRemix.next();
  expect(textImages5050FullBleedRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, IMAGE, IMAGE))).toBeTruthy();
  expect(fallback.matches(toSlideRelativeTo(fallback, HEADING_ONE, PARAGRAPH, IMAGE, IMAGE, HEADING_TWO))).toBeTruthy();
  expect(fallback.matches(toSlideRelativeTo(fallback, IMAGE, IMAGE, IMAGE, HEADING_TWO))).toBeTruthy();
  expect(textImages5050FullBleedRemix.matches(toSlide(IMAGE, IMAGE, PARAGRAPH, IMAGE, HEADING_TWO))).toBeFalsy();
});

it('should match a slide with image(s) + clustered text content', () => {
  const fallback = textImages5050FullBleedRemix.next();
  expect(fallback.matches(toSlideRelativeTo(fallback, IMAGE, IMAGE, IMAGE, IMAGE, HEADING_TWO, PARAGRAPH, HEADING_TWO, PARAGRAPH, HEADING_TWO, PARAGRAPH))).toBeTruthy();
  expect(fallback.matches(toSlideRelativeTo(fallback, IMAGE, IMAGE, IMAGE, IMAGE, HEADING_ONE, PARAGRAPH, HEADING_ONE, PARAGRAPH))).toBeTruthy();
  expect(fallback.matches(toSlideRelativeTo(fallback, HEADING_ONE, PARAGRAPH, IMAGE, IMAGE, IMAGE, IMAGE, HEADING_ONE, PARAGRAPH))).toBeTruthy();
  expect(textImages5050FullBleedRemix.matches(toSlideRelativeTo(textImages5050FullBleedRemix, HEADING_TWO, PARAGRAPH, HEADING_TWO, PARAGRAPH, HEADING_TWO, PARAGRAPH, IMAGE, IMAGE, IMAGE, IMAGE))).toBeTruthy();
  expect(textImages5050FullBleedRemix.matches(toSlideRelativeTo(textImages5050FullBleedRemix, IMAGE, HEADING_ONE, PARAGRAPH, IMAGE, HEADING_ONE, PARAGRAPH))).toBeFalsy();
  expect(textImages5050FullBleedRemix.matches(toSlideRelativeTo(textImages5050FullBleedRemix, IMAGE, HEADING_ONE, PARAGRAPH, IMAGE, IMAGE, HEADING_ONE, PARAGRAPH))).toBeFalsy();
});

it('should group prefix and image group', () => {
  expect(textImages5050FullBleedRemix.matches(toSlide(IMAGE, IMAGE, PARAGRAPH, IMAGE, IMAGE, IMAGE))).toBeTruthy();
});
