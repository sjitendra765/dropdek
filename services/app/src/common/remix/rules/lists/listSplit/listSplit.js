import { Remix } from "../../../Remix";
import { list, text } from "../../../match/Matchers";
import { anyNumber, once } from "../../../match/expressions/Occurring";
import { when } from "../../../match/RemixRule";

/**
 * Split list into two columns when data-count = 6.
 */
export const listSplitRemix = new Remix('list-split', {
  '& .container': {
    width: '75%',
    margin: '0 auto',
    '& h1, & h2, & p': { textAlign: 'center', },
    '& .container': { width: '100%', },
  },
  '& .container-bulleted-list, & .container-numbered-list': {
    width: '100%',
    margin: '0 auto',
    '& ul, & ol': {
      columnCount: '2',
      '& li': {
        width: 'auto',
        '& p': {
          textAlign: 'left',
        },
      },
      '& ul, & ol': {
        columnCount: '1',
      },
    },
  },
},[
  when(text(anyNumber), list(once), text(anyNumber)).score(0.9),
]);
