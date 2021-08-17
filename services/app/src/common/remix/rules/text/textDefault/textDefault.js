import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { chart, heading, paragraph, textList, allText, list, text } from "../../../match/Matchers";
import { between, exactly, once, anyNumber } from "../../../match/expressions/Occurring";

const cssTextCentered = {
  '& .container': {
    margin: '0 auto',
    '& h1, & h2, & p': { textAlign: 'center', },
    '& .container': { width: '100%', },
    '&.container-bulleted-list, &.container-numbered-list': {
      width: 'auto',
      maxWidth: '78%',
      '& p': { textAlign: 'left', },
    },
    '& .container + .container-code': { marginTop: '0.3em', },
    '&.container-math': { width: 'auto !important', },
  },
};

/**
 * Text stacks vertically. Center alignment. Boost: 10.
 * Positive for statements and short slide content.
 */
export const textDefaultRemix = new Remix('text-default', cssTextCentered, [

  // Rule to make this remix available to any text on a slide
  when(allText(between(1, 2))).score(1),

  // Rule to match any single text element:
  when(textList(once)).score(5),

  // Rule to match a heading followed by 1 paragraph:
  when(heading(once), paragraph(once)).score(10),

  // Rule to match a heading followed by 1 list:
  when(heading(once), list(once)).score(10),

  // Rule to match exactly two headings together:
  when(heading(exactly(2))).score(10),

  // Rule boosted when text is followed by a chart, or vice versa, with or without accompanying text:
  when(heading(between(1, 2)), chart(exactly(1))).score(10),
  when(chart(exactly(1)), heading(between(1, 2))).score(10),
  when(heading(between(1, 2)), chart(exactly(1)), text(anyNumber)).score(10),
  when(heading(between(1, 2)), text(anyNumber), chart(exactly(1))).score(10),
  when(chart(exactly(1)), text(anyNumber), heading(between(1, 2))).score(10),
  when(chart(exactly(1)), heading(between(1, 2)), text(anyNumber),).score(10),
  
]);
