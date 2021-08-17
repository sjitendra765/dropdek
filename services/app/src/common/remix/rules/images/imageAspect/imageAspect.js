import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { imageLogo, plainText, label } from "../../../match/Matchers";
import { anyNumber, once } from "../../../match/expressions/Occurring";

/**
 * i1: Single image, aspect ratio contained.
 */
export const imageAspectRemix = new Remix('image-1-aspect', {
  '& .container': {
    width: '100%',
    textAlign: 'center',
  },
  '& .container-image, .container-logo': {
    margin: '0',
    '& img': {
      height: '100%',
      width: '100%',
      objectFit: 'contain',
    },
  },
  '& .container-logo': {
    '& .imgWrap': {
      maxWidth: '50%',
      margin: '0 auto 1em auto',
      padding: '3%',
      boxSizing: 'border-box',
      '& img': {
        height: '100%',
        width: '100%',
        margin: '0',
        padding: '0',
      },
      '&.opaqueBg': {
        borderRadius: '0.5em',
        padding: '1.5em',
      },
    },
  },
  '& .group-text-before, & .group-text-after': {
    width: '100%',
    margin: '0 auto 1em auto',
  },
  '& .group-text-after': {
    margin: '1em auto 0 auto',
  },
},
when(
  label(plainText(anyNumber), "group-text-before"),
  imageLogo(once),
  label(plainText(anyNumber), "group-text-after"),
).score(20));
