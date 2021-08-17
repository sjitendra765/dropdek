import { Remix } from "../../../Remix";
import { headingOne, headingTwo, text, logo } from "../../../match/Matchers";
import { anyNumber, atLeast, exactly, between } from "../../../match/expressions/Occurring";
import { when } from "../../../match/RemixRule";

/**
 * Large blockbuster heading.
 */
export const textBlockbusterRemix = new Remix('text-blockbuster',
  {
    '& .container': {
      width: '100%',
      margin: '0 auto',
      '&.container-heading-one': {
        '& h1': {
          textAlign: 'center',
          fontSize: '9em',
          margin: '0 0 0.05em 0',
          lineHeight: '0.925',
        },
      },
      '&.container-heading-two, &.container-paragraph, &.container-block-quote blockquote': {
        textAlign: 'center',
      },
      '&.container-heading-one + .container-heading-two h2': {
        marginTop: '0.5em',
      },
      '&.container-heading-one + .container-block-quote': {
        marginTop: '0.75em',
      },
      '&.container-logo': {
        '& *': { boxSizing: 'border-box', },
        margin: '0 auto 1.5em auto',
        padding: '0',
        width: '50%',
        height: '4.5em',
        '& .element': {
          width: '45%',
          display: 'flex',
          margin: '0 auto',
          '& .imgWrap': {
            '&.opaqueBg': {
              borderRadius: '0.5em',
              padding: '1.5em',
            },
            '& img': {
              margin: '0 auto',
              width: 'auto',
              maxWidth: '100%',
            },
          },
        },
      },

    },
    '& .sequence-heading-one.container.container-heading-one h1': {
      marginBottom: '0.2em',
      '&:last-of-type': {
        marginBottom: '0',
      },
    },
  },[
    // Boost when slide contains only headings:
    when(headingOne(exactly(1))).score(11),
    when(headingOne(exactly(2))).score(11),
    when(headingOne(exactly(1)), headingTwo(exactly(1))).score(12),
    when(headingTwo(exactly(1)), headingOne(exactly(1))).score(12),
    when(headingTwo(exactly(1)), headingOne(exactly(1)), text(exactly(1))).score(12),
    when(text(exactly(1)), headingOne(exactly(1)), headingTwo(exactly(1))).score(12),

    // Support for small logo above heading(s)
    when(logo(exactly(1)), headingOne(exactly(1))).score(40),
    when(logo(exactly(1)), headingOne(exactly(2))).score(40),
    when(logo(exactly(1)), headingOne(exactly(1)), headingTwo(exactly(1))).score(40),
    when(logo(exactly(1)), headingTwo(exactly(1)), headingOne(exactly(1))).score(40),
    when(logo(exactly(1)), headingTwo(exactly(1)), headingOne(exactly(1)), text(exactly(1))).score(40),
    when(logo(exactly(1)), text(exactly(1)), headingOne(exactly(1)), headingTwo(exactly(1))).score(40),

    // Accepts greater range of text content to prevent jumping (PARAGRAPH, HEADING_ONE, HEADING_TWO, BLOCK_QUOTE)
    when(headingOne(atLeast(1)), text(anyNumber)),
    when(headingOne(exactly(1)), text(between(1, 2))).score(12),
    when(text(between(1, 2)), headingOne(exactly(1))).score(12), // Expanded to allow reverse order

    when(logo(exactly(1)), headingOne(atLeast(1)), text(anyNumber)),
    when(logo(exactly(1)), headingOne(exactly(1)), text(between(1, 2))).score(40),
    when(logo(exactly(1)), text(between(1, 2)), headingOne(exactly(1))).score(40),

  ]);
