import { textDefaultRemix } from "./textDefault";
import { toSlide } from "../../../utils/testUtils";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";
import { CHART } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/chart/type";

it('should match a slide with up to two text elements', () => {
  expect(textDefaultRemix.score(toSlide(PARAGRAPH))).toBe(5);
  expect(textDefaultRemix.score(toSlide(PARAGRAPH, HEADING_ONE))).toBe(1);
  expect(textDefaultRemix.score(toSlide(HEADING_ONE, PARAGRAPH, HEADING_ONE))).toBe(0);
  expect(textDefaultRemix.score(toSlide(HEADING_ONE, PARAGRAPH, PARAGRAPH))).toBe(0);
  expect(textDefaultRemix.matches([])).toBeFalsy();
});

it('should match a slide with a heading and a chart', () => {
  expect(textDefaultRemix.matches(toSlide(HEADING_ONE, CHART))).toBeTruthy();
  expect(textDefaultRemix.matches(toSlide(HEADING_ONE, HEADING_TWO, CHART))).toBeTruthy();
  expect(textDefaultRemix.matches(toSlide(CHART, HEADING_ONE, HEADING_TWO))).toBeTruthy();
  expect(textDefaultRemix.matches(toSlide(HEADING_ONE, CHART, HEADING_TWO))).toBeTruthy();
  expect(textDefaultRemix.matches(toSlide(CHART))).toBeFalsy();
});
