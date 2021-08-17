import { Remix } from "../../../Remix";
import { anyElement, list, plainText, } from "../../../match/Matchers";
import { anyNumber, atLeast } from "../../../match/expressions/Occurring";
import { when } from "../../../match/RemixRule";

/**
 * Unordered list items presented as horizontal panels.
 */
export const listUnorderedPanelsRemix = new Remix('list-unordered-panels', {
  '& *': { boxSizing: 'border-box', },
  '& .container': {
    width: '75%',
    margin: '0 auto',
    '& h1, & h2, & p': { textAlign: 'center', },
    '& .container': { width: '100%', },
  },
  '& .container-bulleted-list, & .container-numbered-list': {
    width: '100%',
    margin: '0 auto',
    '& p': {
      width: '100%',
    },
    '& ul, & ol': {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& li': {
        width: 'auto',
        margin: '0 0.75em 1.5em 0.75em',
        maxWidth: '47%',
        background: 'rgba(255,255,255,0.15)',
        fontSize: '85%',
        borderRadius: '0.25em',
        boxShadow: '0 0.05em 0.075em rgba(0,0,0,.25)',
        '&:first-child': {
          margin: '0 0.75em 1.5em 0em',
        },
        '&:last-child': {
          margin: '0 0 1.5em 0.75em',
        },
        '& ul, & ol': {
          margin: '0.75em 0 0 -1.5em',
          display: 'block',
          width: 'auto',
          padding: '0',
          '& li': {
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '0.25em',
            display: 'inline-block',
            maxWidth: '100%',
            fontSize: '80%',
            boxShadow: '0 0.05em 0.075em rgba(0,0,0,.25)',
            '& p': {
              width: 'auto',
            },
          },
        },
      },
    },
  },
  // nested bullet
  '& .container-bulleted-list': {
    '& ul': {
      textAlign: 'center',
      '& li': {
        padding: '1.5em',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        '&:before': { display: 'none', },
        '& p': { textAlign: 'center', },
        '& ul': {
          margin: '0.75em 0 0 0!important',
          alignSelf: 'stretch',
          '& li': {
            margin: '0 0.5em 0.5em 0.5em !important',
            padding: '0.5em',
            '&:last-of-type': {
              margin: '0 0.5em !important',
            },
          },
        },
      },
    },
  },
  // nested numbered
  '& .container-numbered-list': {
    '& ol': {
      '& li': {
        padding: '1.5em 1.5em 1.5em 3em',
        '& p': { textAlign: 'left', },
        '& ol': {
          margin: '0.75em 0 0 0',
          '& li': {
            margin: '0 0.5em 0.5em 0 !important',
            padding: '0.5em 0.75em 0.5em 2.5em',
          },
        },
      },
    },
  },
},[
  when(plainText(anyNumber), list(atLeast(1)), plainText(anyNumber)).score(1),
]);
