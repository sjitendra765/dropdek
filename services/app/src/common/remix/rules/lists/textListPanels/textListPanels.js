import * as culori from "culori";
import { Remix } from "../../../Remix";
import { label, list, plainText, image, } from "../../../match/Matchers";
import { anyNumber, atLeast, between, exactly } from "../../../match/expressions/Occurring";
import { when } from "../../../match/RemixRule";

export const textListPanelsRemix = new Remix('textlist-panels', (colorChart) => ({
  '& *': { boxSizing: 'border-box !important' },
  backgroundColor: `${colorChart.background()}`,
  padding: '0',
  flexDirection: 'row',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    background: 'linear-gradient(90deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.03)) 60%',
  },
  // Text
  '& .group-text': {
    zIndex: '1',
    position: 'relative',
    textAlign: 'left',
    width: '65%',
    display: 'flex',
    padding: '0 8% 0 9%',
    paddingTop: '0 !important',
    margin: 'auto 0 0 0',
    flexWrap: 'wrap',
    '& .container': {
      width: '100%',
      '& H1, & H2, & P': {
        textAlign: 'left',
      },
      '& H1': {
        marginBottom: '0 !important',
        lineHeight: '1.1',
      },
      '& H2': {
        marginBottom: '-0.04em !important',
      },
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
  },
  // Lists
  '& .group-list': {
    width: '35%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    '& .element': {
      height: '100%',
    },
    '& .container-bulleted-list, & .container-numbered-list': {
      display: 'flex',
      flexDirection: 'column',
      padding: '0',
      height: '100%',
      '& ul, & ol': {
        margin: '0',
        display: 'flex',
        flexDirection: 'column',
        padding: '3em 2em 3em 3.25em',
        height: '100%',
        width: '100%',
        '& li': {
          margin: 'auto 0',
          padding: '0',
          display: 'flex',
          alignItems: 'center',
          '&:before': {
            height: '100%',
            fontSize: '80%',
            lineHeight: '1.35',
            position: 'relative',
            left: '-0.25em',
            content: 'counter(listcounter) "‒";',
            width: 'auto',
            letterSpacing: '0.5em',
          },
          '& p': {
            fontSize: '80%',
            lineHeight: '1.35',
            margin: '0',
          },
        },
      },
      '& ul': {
        padding: '3em',
        '& li': {
          '&:before': {
            display: "none",
          },
        },
      },
    },
  },
  // Images
  '& .container-image': {
    zIndex: '0',
    position: 'absolute',
    left: '0',
    width: '65%',
    opacity: '0.8',
    // '&:before': {
    //   content: '""',
    //   position: 'absolute',
    //   top: '0',
    //   bottom: '0',
    //   left: '0',
    //   width:'25%',
    //   "-webkit-transform": "translateZ(0)",
    //   background: `linear-gradient(-90deg, ${culori.formatRgb({ ...culori.parse(colorChart.background()), alpha: 0 })} 0, ${culori.formatRgb({ ...culori.parse(colorChart.background()), alpha: 0 })} 30%, ${culori.formatRgb({ ...culori.parse(colorChart.background()), alpha: 0.8 })} 100%)`,
    // },
    '& img': {
      objectFit: 'cover',
    }
  },
}),
[

  when(
    image(between(0, 1)),
    label(plainText(atLeast(1)), "group-text"),
    label(list(exactly(1)), "group-list"),
  ).score(2),

  when(
    label(plainText(atLeast(1)), "group-text"),
    image(between(0, 1)),
    label(list(exactly(1)), "group-list"),
  ),

  when(
    label(plainText(atLeast(1)), "group-text"),
    label(list(exactly(1)), "group-list"),
    image(between(0, 1)),
  )

]);
