import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { bulletedList, headingOne, image, inOrder, label, logo, or, plainText } from "../../../match/Matchers";
import { atLeast, exactly, optional } from "../../../match/expressions/Occurring";

/**
 * Centered quote, additional quotes stack with increased margin. with or without image.
 */
export const coverSimpleRemix = new Remix('cover-simple', {
  alignItems: 'center !important',
  '& .container': {
    '&:not(.container-block-quote)': {
      position: 'relative',
      zIndex: '1',
    },
  },
  '& .container-heading-one': {
    '& h1': {
      fontSize: '4em',
      margin: '0 0 0.35em 0',
      lineHeight: '0.925',
      textAlign: 'center',
    },
  },
  '& .container-heading-two': {
    '& h2': {
      margin: '0 0 0.5em 0',
    },
  },

  // Logo
  '& .container-logo': {
    margin: '-2.5em 0 1em 0',
    '& .imgWrap': {
      maxWidth: '10em',
      height: '5em',
      '& img': {
        objectFit: 'contain',
      },
    },
  },

  // Main title / Sub / Image / Logo Group
  // --------------------------------------
  '& .title-group': {
    textAlign: 'center',
    zIndex: '10',
    margin: 'auto',
    '& .container': {
      textShadow: '0 0.02em 0.04em rgba(0,0,0,0.5)',
    },
    '& .container-logo .imgWrap': {
      margin: '0 auto',
    },
    '& .container.container-image': {
      position: 'static !important',
      '&:before': {
        width: '0',
        height: '0',
      },
      '& .element': {
        width: '7em',
        height: '7em',
        margin: '0 auto 1.5em auto',
        '& .imgWrap img': {
          borderRadius: '50%',
          objectFit: 'cover',
          position: 'static',
          opacity: '1',
          zIndex: '2',
          filter: 'grayscale(0%) brightness(1) contrast(1)',
        },
      },
    },
  },

  // Author / Date Group - LIST
  // --------------------------------------
  '& .inline-group': {
    textTransform: 'uppercase',
    display: 'flex',
    justifyContent: 'center',
    justifySelf: 'flex-end',
    zIndex: '1',

    // List
    '& .container-bulleted-list': {
      width: '100%',
      display: 'flex',
      '& ul': {
        display: 'flex',
        margin: '0',
        padding: '0',
        width: '100%',
        '& li': {
          margin: '0 1em !important',
          padding: '0',
          width: '100%',
          '&:before': {
            marginLeft: '-1.25em',
            lineHeight: '1',
          },
          '& p': {
            width: 'max-content',
            margin: '0',
            padding: '0',
            textShadow: '0 0.02em 0.04em rgba(0,0,0,0.5)',
          },
          '&:first-child': {
            '&:before': {
              content: '""',
            },
          },
          '&:first-child:last-child': {
            margin: '0 !important',
            '&:before': {
              content: '""',
            },
          },
        },
      },
    },

  },

  // Fullbleed background image
  '& .container.container-image': {
    zIndex: '0 !important',
    position: 'absolute !important',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    margin: '0 !important',
    height: 'auto !important',
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0',
      left: '0',
    },
    '& .element': {
      margin: '0',
      overflow: "hidden",
      padding: '0',
    },
    '& .imgWrap img': {
      margin: '0',
      padding: '0',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center center',
      position: "absolute",
      opacity: '0.1',
      filter: 'grayscale(100%) brightness(1.35) contrast(1.35)',
    },
  },

  // Pairings
  '&.container-heading-one + .container-heading-two h2': {
    marginTop: '0',
  },
  '&.container-heading-one + .container-block-quote': {
    marginTop: '0.75em',
  },

},[

  // Optional image or Logo in first position
  when(
    label(
      or(
        inOrder(logo(optional), plainText(atLeast(1))),
        inOrder(image(optional), plainText(atLeast(1))),
      ),
      "title-group"
    ),
    label(
      inOrder(
        bulletedList(optional)
      ),
      "inline-group"
    ),
    image(optional),
  ).score(0.02),

  // Text Only
  when(
    plainText(optional), headingOne(exactly(1)),
    headingOne(atLeast(1)), plainText(optional),
    label(
      inOrder(
        bulletedList(optional)
      ),
      "inline-group"
    ),
    image(optional),
  ).score(0.02),

]);
