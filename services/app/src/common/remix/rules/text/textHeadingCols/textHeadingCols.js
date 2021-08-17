//  rt2:   Non-clustered paragraphs in sequence are presented alongside one another: | A | B | C | D | up to a total of four.
//         Note: This remix will match ANY sequence of 2, 3 or 4 paragraphs together.

import { Remix } from "../../../Remix";
import { heading, headingOne, headingTwo } from "../../../match/Matchers";
import { exactly } from "../../../match/expressions/Occurring";
import { when } from "../../../match/RemixRule";

/**
 * Non-clustered paragraphs in sequence are presented alongside one another: | A | B | C | D | up to a total of four.
 * Positive for lengthy paras.
 */
export const textHeadingColsRemix = new Remix('text-headingcols',
  {
    '& .hook': {
      display: 'block',
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      backgroundImage: 'linear-gradient(90deg,rgba(255,255,255,1),rgba(255,255,255,1) 50%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.7) 100%)',
      opacity: '0.025',
      zIndex: '0',
    },
    '& .container': {
      width: '100%',
      textAlign: 'center',
      zIndex: '1',
    },
    '& .container.container-heading-one, & .container.container-heading-two': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      '& h1, & h2': {
        width: '100%',
        margin: '0',
      },
    },
    '& .container.container-heading-one[data-length="2"], & .container.container-heading-two[data-length="2"]': {
      '& .element': {
        width: '41%',
        '& h1': {
          fontSize: '3.5em',
        },
        '& h2': {
          fontSize: '2.5em',
        },
      },
    },
  },[
    when(headingOne(exactly(2))).score(1),
    when(headingTwo(exactly(2))).score(1),
  ]);
