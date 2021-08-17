//  rl1:   Split single list(s) into two columns.
import { Remix } from "../../../Remix";
import { label, list, plainText, } from "../../../match/Matchers";
import { atLeast } from "../../../match/expressions/Occurring";
import { when } from "../../../match/RemixRule";

/**
 * Centered list that builds in both directions. Text left list right with border.
 */
export const textListCenteredRemix = new Remix('textlist-centered', {
  flexDirection: 'row',
  alignItems: 'center !important',
  // flexWrap: 'wrap',
  '& .container': {
    margin: '0 auto !important',
  },
  '& .group-text': {
    minWidth: '35%',
    maxWidth: '50%',
    textAlign: 'right',
    '& H1': {
      textAlign: 'right',
      marginBottom: '0.3em !important',
      lineHeight: '1.125',
    },
    '& H2': {
      textAlign: 'right',
      marginBottom: '-0.04em !important',
    },
    '& p': {
      textAlign: 'right',
    },
    '& .container-heading-one + .container-heading-two h2': {
      marginTop: '0.35em',
    },
    '& .container-heading-two + .container-heading-one h1': {
      marginTop: '0.245em',
    },
    '& .container-heading-one + .container-paragraph p:first-of-type, & .container-heading-two + .container-paragraph p:first-of-type': {
      marginTop: '0.75em',
    },
    '& .sequence-heading-one, & .sequence-heading-two': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      '& H1 + H1': {
        opacity: '0.7',
        marginTop: '0.25em',
      },
      '& H2 + H2': {
        opacity: '0.7',
        marginTop: '0.35em',
      },
    },
  },
  '& .container-bulleted-list, & .container-numbered-list': {
    textAlign: 'left',
    marginLeft: '9% !important',
    padding: '0.25em 0 0.25em 9%',
    position: 'relative',
    minWidth: '41%',
    maxWidth: '47%',
    '&:before': {
      display: 'block',
      position: 'absolute',
      content: '""',
      top: '0',
      bottom: '0',
      left: '0',
      width: '0.11em',
      background: '#1a1a1a',
    },
    '& li': {
      width: 'auto',
    },
  },
  '& .container-bulleted-list + .group.group-text, & .container-numbered-list + .group.group-text': {
    margin: '0',
    padding: '0',
    minWidth: '100%',
    '& .container *': {
      textAlign: 'center',
    },
  },
},
when(
  label(plainText(atLeast(1)), "group-text"),
  list(atLeast(1))
).score(3));
