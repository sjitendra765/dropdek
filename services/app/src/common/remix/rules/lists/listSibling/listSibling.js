//  rl1:   Split single list(s) into two columns.
import { Remix } from "../../../Remix";
import { list } from "../../../match/Matchers";
import { atLeast } from "../../../match/expressions/Occurring";
import { when } from "../../../match/RemixRule";

/**
 * Display up to 3 sibling lists across columns.
 */
export const listSiblingRemix = new Remix('list-sibling-sidebyside', {
  '& .container': {
    width: '75%',
    margin: '0 auto',
    '& h1, & h2, & p': { textAlign: 'center', },
    '& .container': { width: '100%', },
  },
  '& .container-bulleted-list[data-length="2"], & .container-numbered-list[data-length="2"]': {
    width: '100%',
    maxWidth: '90%',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 auto',
    '& ul, & ol': {
      width: '45%',
      margin: '0',
      padding: '0.75em 0',
      '&:last-of-type': {
        margin: '0!important',
      },
      '& li': {
        width: 'auto',
        '& p': {
          textAlign: 'left',
        },
        '&:last-of-type': {
          marginbottom: '0',
        },
      },
    },
  },
  '& .container-bulleted-list[data-length="3"], & .container-numbered-list[data-length="3"]': {
    width: '100%',
    maxWidth: '90%',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 auto',
    '& ul, & ol': {
      width: '29%',
      margin: '0',
      padding: '0.75em 0',
      '&:last-of-type': {
        margin: '0!important',
      },
      '& li': {
        width: 'auto',
        '& p': {
          textAlign: 'left',
        },
        '&:last-of-type': {
          marginbottom: '0',
        },
      },
    },
  },
},
when(list(atLeast(2))).score(1));
