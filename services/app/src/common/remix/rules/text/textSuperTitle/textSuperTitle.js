import { Remix } from "../../../Remix";
import { headingOne, headingTwo, paragraph, text, logo, quote } from "../../../match/Matchers";
import { anyNumber, atLeast, exactly, between } from "../../../match/expressions/Occurring";
import { when } from "../../../match/RemixRule";

/**
 * Super big title - H1 / H2.
 */
export const textSuperTitleRemix = new Remix('text-supertitle', {
  border: '0px solid #f55ffe', 
  padding: '9% 4.5%',

  '& .container': {
    width: '100%',
    margin: '0 auto',
    border: '0px solid #FFc300',
      
    // H1
    '&.container-heading-one': {
      '& h1': {
        textAlign: 'center',
        margin: '0 0 0.05em 0',
        fontSize: '14em', // 12
        lineHeight: '0.9',
        letterSpacing: '-0.04em',
      },
    },

    // H2
    '&.container-heading-two': {
      '& h2': {
        textAlign: 'center',
        margin: '0 0 0.05em 0',
        fontSize: '5em',
        lineHeight: '1',
      },
    },
      
    // P / Quote
    '&.container-paragraph': {
      textAlign: 'center',
      fontSize: '1.5em',
      lineHeight: '1',
      maxWidth: '95%',
      margin: '0 auto',
      '& p': {
        margin: '0',
      },
    },

    '&.container-block-quote blockquote': {
      textAlign: 'center',
      fontSize: '1.5em',
      maxWidth: '95%',
      margin: '0 auto',
      '& p': {
        margin: '0 0 0.25em 0.55em',
      },
    },

    // Pairings
    '&.container-heading-one + .container-heading-two, &.container-heading-two + .container-heading-one': {
      marginTop: '-0.05em',
    },
    '&.container-heading-one .element + .element, &.container-heading-two .element + .element': {
      margin: '1.5em 0 0 0',
    },
    '&.container-paragraph .element + .element': {
      margin: '1em 0 0 0',
    },

    // H1 + Quote, H2 + Quote
    '&.container-heading-one + .container-block-quote': {
      marginTop: '0',
    },
    '&.container-heading-two + .container-block-quote': {
      marginTop: '0.5em',
    },
    '&.container-paragraph + .container-heading-one, &.container-paragraph + .container-heading-two': {
      marginTop: '1.5em',
    },
    '&.container-heading-one + .container-paragraph, &.container-heading-two + .container-paragraph': {
      marginTop: '0.25em',
    },

    // Logo
    '&.container-logo': {
      '& *': { boxSizing: 'border-box', },
      margin: '0 auto 1em auto',
      padding: '0',
      width: '50%',
      height: '4.5em',
      '& .element': {
        width: '45%',
        display: 'flex',
        margin: '0 auto',
        '& .imgWrap img': {
          margin: '0 auto',
          width: 'auto',
          maxWidth: '100%',
        },
      },
    },

  },

  // Sequences H1 + H1 / H2 + H2
  '& .sequence-heading-one.container.container-heading-one h1': {
    marginBottom: '0.2em',
    border: '0px solid blue',
    '&:last-of-type': {
      marginBottom: '0',
    },
  },

},[

  // Catch all
  when(text(between(2,4))).score(5),
  
  // single element boost variants
  when(headingOne(exactly(1))).score(10),
  when(headingTwo(exactly(1))).score(4),
  when(paragraph(exactly(1))).score(4),

  // double element boost variants
  when(headingTwo(exactly(2))).score(4),
  when(quote(exactly(2))).score(4), // not being picked up?

  when(headingOne(exactly(1)), headingTwo(exactly(1))).score(10),
  when(headingOne(exactly(1)), quote(exactly(1))).score(4), // not being picked up?
  when(headingTwo(exactly(1)), headingOne(exactly(1))).score(10),

  // Support for small logo above heading(s)
  when(logo(exactly(1)), text(between(1,4))).score(11),
  when(logo(exactly(1)), headingOne(exactly(1))).score(25),
  when(logo(exactly(1)), headingOne(exactly(2))).score(25),
  when(logo(exactly(1)), headingTwo(exactly(1))).score(25),
  when(logo(exactly(1)), headingTwo(exactly(2))).score(25),
  when(logo(exactly(1)), headingOne(exactly(1)), headingTwo(exactly(1))).score(25),
  when(logo(exactly(1)), headingOne(exactly(1)), paragraph(exactly(1))).score(25),
  when(logo(exactly(1)), headingTwo(exactly(1)), headingOne(exactly(1))).score(25),
  when(logo(exactly(1)), headingTwo(exactly(1)), headingOne(exactly(1)), text(exactly(1))).score(25),
  when(logo(exactly(1)), text(exactly(1)), headingOne(exactly(1)), headingTwo(exactly(1))).score(25),

]);
