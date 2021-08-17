import { toSlide } from "../../../utils/testUtils";
import { listTextUpwardRemix } from "./listTextUpward";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { BULLETED_LIST } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/list/bulleted/type";
import { NUMBERED_LIST } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/list/numbered/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with plain text followed by a list', () => {
  expect(listTextUpwardRemix.matches(toSlide(HEADING_ONE, NUMBERED_LIST))).toBeTruthy();
  expect(listTextUpwardRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, BULLETED_LIST))).toBeTruthy();
  expect(listTextUpwardRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, NUMBERED_LIST, NUMBERED_LIST))).toBeFalsy();
  expect(listTextUpwardRemix.matches(toSlide(BULLETED_LIST))).toBeTruthy();
});

it('should apply labels to the text portion of a slide', () => {
  const [, labels] = listTextUpwardRemix.evaluate(toSlide(HEADING_ONE, PARAGRAPH, BULLETED_LIST));
  expect(labels).toBeDefined();
  expect(Object.keys(labels).length).toEqual(2);
  expect(labels['0']).toEqual("group-text");
  expect(labels['1']).toEqual("group-text");
});
