import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { inOrder, or, paragraph, quote, image, imageLogo, plainText } from "../../../match/Matchers";
import { optional } from "../../../match/expressions/Occurring";

/**
 * Centered quote, additional quotes stack with increased margin. with or without image.
 */
export const quoteSimpleImageRemix = new Remix('quote-simple-img', {
  alignItems: 'center !important',
  '& .container-block-quote': {
    position: 'relative',
    zIndex: '0',
    width: '75%',
    marginTop: '0.5em',
    '& blockquote': {
      textAlign: 'center',
      margin: '0 auto',
      '& p': {
        display: 'inline',
        position: 'static',
        '&:before, &:after': {
          margin: '0 0.075em 0 0',
          position: 'relative',
        },
        '&:after': {
          margin: '0 0 0 0.05em',
        },
      },
    },
  },
  '& .container': {
    '&:not(.container-block-quote)': {
      position: 'relative',
      zIndex: '1',
    },
  },
  '& .container-block-quote + .container-paragraph': {
    '& p': {
      margin: '0.75em 0 0 0',
    },
    '& p:before': {
      content: '"‒"',
      margin: '0 0.3em 0 0',
    },
  },
  '& .container-bulleted-list, & .container-numbered-list': {
    width: 'auto',
  },
  '& .container-paragraph + .container-block-quote': {
    marginTop: '4% !important',
  },
  '& .container-paragraph + .container-image, & .container-image + .container-paragraph, & .container-logo + .container-paragraph, & .container-block-quote + .container-image, & .container-paragraph + .container-logo, & .container-block-quote + .container-logo': {
    margin: '4% 0 0 0 !important',
  },
  '& .container-heading-two + .container-logo, & .container-heading-two + .container-image': {
    margin: '3% 0 0 0 !important',
  },
  '& .container-heading-one + .container-logo, & .container-heading-one + .container-image, & .container-block-quote + .container-heading-one, & .container-block-quote + .container-heading-two, & .container-image + .container-heading-one, & .container-logo + .container-heading-one, & .container-image + .container-heading-two, & .container-logo + .container-heading-two': {
    margin: '2% 0 0 0 !important',
  },
  '& .container-image, & .container-logo': {
    height: 'auto',
    width: 'auto',
    margin: '0 0 4% 0',
    '& .imgWrap': {
      margin: '0',
      float: 'left',
    },
  },
  '& .container-logo': {
    '& .imgWrap': {
      width: '7.5em',
      height: '6.5em',
      '& img': {
        borderRadius: '0',
        objectFit: 'contain',
      },
    },
  },
  '& .container-image': {
    '& .element': {
      width: '8em',
      height: '8em',
      '& .imgWrap img': {
        borderRadius: '50%',
        objectFit: 'cover',
      },
    },
  },
},
when(
  or(
    inOrder(quote(), imageLogo(), plainText(optional)),
    inOrder(quote(), plainText(optional), imageLogo()),
    inOrder(imageLogo(optional), quote(), plainText(optional)),
    inOrder(imageLogo(optional), plainText(optional), quote()),
  )
).score(41));
