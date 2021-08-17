//  rt3:   Two Column Layout. Builds from bottom upwards. Boost score of 0.05 ensures that safer remixes are surfaced before this one.
import { Remix } from "../../../Remix";
import { heading, label, paragraph } from "../../../match/Matchers";
import { atLeast } from "../../../match/expressions/Occurring";
import { when } from "../../../match/RemixRule";

/**
 * Two column Layout. Builds from bottom upwards. Boost of 0.05 ensures safer remixes are surfaced before this one.
 */
export const headingParagraphUpwardRemix = new Remix('h1para-5u6u-upward',
  {
    height: '100%',
    display: 'grid',
    gridGap: '0.15em',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridTemplateRows: '1fr',
    '& .group-headings': {
      gridColumn: '1 / 6',
      gridRowEnd: '3',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      height: '100%',
      alignItems: 'flex-end !important',
      '& H1, & H2': { textAlign: 'right', },
      // Margins reduced to bring text together more successfully:
      '& h1, & h2': { margin: '0 0 0.166em 0', },
      // Margin removed on last element of last container:
      '& .container:last-child h1:last-child': { marginBottom: '0.18em', },
      '& .container:last-child h2:last-child': { marginBottom: '0.3em', },
      '& .sequence-heading-one, & .sequence-heading-two': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        '& H1 + H1': { opacity: '0.65', },
        '& H2 + H2': { opacity: '0.65', },
      },
    },
    '& .container-paragraph': {
      gridColumn: '7 / -1',
      gridRowEnd: '3',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      height: '100%',
      alignItems: 'flex-end !important',
      margin: '0 !important',
      '& P': {
        margin: '0.75em 0 0.35em 0',
        lineHeight: '1.235',
        width: '100%',
      },
    },
  },
  when(
    label(heading(atLeast(1)), "group-headings"),
    paragraph(atLeast(1)),
  ).score(0.05));
