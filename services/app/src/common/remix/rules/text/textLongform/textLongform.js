import { Remix } from "../../../Remix";
import { headingOne, textList, cluster, text, label, group, or, allText, logo } from "../../../match/Matchers";
import { anyNumber, atLeast, once, exactly } from "../../../match/expressions/Occurring";
import { when } from "../../../match/RemixRule";
import { textDefaultRemix } from "../textDefault/textDefault";

/**
 * Positive for lengthy paras. All text top to bottom, left to right.
 */
export const textLongformRemix = new Remix('text-longform',
  {
    justifyContent: 'flex-start !important',
    alignItems: 'flex-start !important',
    '& *': {
      boxSizing: 'border-box'
    },
    '& .container': {
      width: '100%',
      textAlign: 'left',
    },
    '& .container-logo': {
      '& *': { boxSizing: 'border-box', },
      margin: '0 0 1.5em 0',
      padding: '0',
      width: '45%',
      height: '3.5em',
      '& .element': {
        width: '45%',
        display: 'flex',
        '& .imgWrap img': {
          margin: '0 auto 0 0',
          width: 'auto',
          maxWidth: '100%',
        },
      },
    },
    '& .sequence': {
      width: '100%',
      '& .cluster': {
        width: '100%',
        '& .container': {
          marginBottom: '0',
        },
        '& .container:last-of-type': {
          marginBottom: '1.5em',
        },
      },
    },

  },[
    // When there are at least 3 cluster-or-text blocks:
    when(
      group(
        or(
          allText(once),
          cluster(allText(atLeast(1)), once)
        ), atLeast(3)
      )
    ),

    // When there are exactly 2 clusters of text (eg. H1 P H1 P):
    when(cluster(allText(atLeast(1)), exactly(2))).score(20),
    when(cluster(allText(atLeast(1)), exactly(3))).score(20),

    // Included as an option
    when(headingOne(atLeast(1)), allText(atLeast(1))).score(5),

    // Includes Logo
    when(logo(exactly(1)), allText(atLeast(1))).score(8),
    when(allText(atLeast(1)), logo(exactly(1)), allText(anyNumber)).score(8),

    // We make textLongform the first test - if it doesn't match then we allow textdefault to be used (to avoid both being)
  ]).then(textDefaultRemix);
