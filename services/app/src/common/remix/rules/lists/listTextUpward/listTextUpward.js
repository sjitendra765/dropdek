import { Remix } from "../../../Remix";
import { list, plainText, label } from "../../../match/Matchers";
import { anyNumber } from "../../../match/expressions/Occurring";
import { when } from "../../../match/RemixRule";

/**
 * Builds from bottom. list fills 1-6, 7 empty as gutter, then text fill units 8-12.
 */
export const listTextUpwardRemix = new Remix('listtext-6u6u-upward', {
  height: '100%',
  display: 'grid',
  gridGap: '0.15em',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gridTemplateRows: '1fr',
  '& .container': {
    gridRow: '1/2',
    display: 'flex',
    alignItems: 'flex-end !important',
    margin: '0',
    flexWrap: 'wrap',
  },
  '& .group-text': {
    gridColumn: '8 / -1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: '100%',
    alignItems: 'flex-end',
    margin: 'auto 0 0 0',
    // Margins reduced to bring text together more successfully:
    '& h1, & h2, p': { margin: '0 0 0.166em 0', textAlign: 'right', },
    // Margin removed on last element of last container:
    '& .container:last-child h1:last-child': { marginBottom: '0.18em', },
    '& .container:last-child h2:last-child': { marginBottom: '0.35em', },
    '& .container:last-child p:last-child': { marginBottom: '0.35em', },
    '& .sequence-heading-one, & .sequence-heading-two': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      '& H1 + H1': { opacity: '0.65', },
      '& H2 + H2': { opacity: '0.65', },
    },
  },
  '& .container-bulleted-list, & .container-numbered-list': {
    height: '100%',
    gridColumn: '1 / 7',
    '& ul, & ol': {
      width: '100%',
      marginBottom: '0.45em',
      '& li': {
        width: 'auto',
        '&:last-of-type': {
          width: 'auto',
          marginBottom: '0',
        },
      },
    },
  },
},
when(
  label(plainText(anyNumber), "group-text"),
  list()
).score(0.025));
