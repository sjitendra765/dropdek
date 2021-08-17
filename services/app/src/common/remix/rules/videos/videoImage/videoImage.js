import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { image, inOrder, label, or, plainText, video } from "../../../match/Matchers";
import { anyNumber, atLeast, once } from "../../../match/expressions/Occurring";

/**
 *  v4: Image as Slide BG
 */
export const videoImageRemix = new Remix('video-image', {
  '& .container': {
    width: '100%',
    textAlign: 'center',
  },

  '& .group-text-before, & .group-text-after': {
    width: '100%',
    zIndex: '2',
    margin: '0 0 1em 0',
    '& .container:last-child *:last-child': { margin: '0', },
  },
  '& .group-text-after': {
    margin: '1em 0 0 0',
  },
  '& .container-heading-one, & .container-heading-two, & .container-paragraph, & .container-block-quote, & .container-bulleted-list, & .container-numbered-list': {
    zIndex: '2',
  },
  '& .container-video': {
    position: 'relative',
    zIndex: '1',
  },
  // image
  '& .container-image': {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    '& .imgWrap img': {
      objectFit: 'cover',
      width: '100%',
      height: '100%',
      opacity: '0.25',
    },
  },
  '& .videoContainer': {
    zIndex: '1',
    position: 'relative',
    flexFlow: 'row',
    '& iframe': {
      width: '100%',
    },
  },
},
when(
  label(plainText(anyNumber), "group-text-before"),
  or(
    inOrder(video(once), image(once)),
    inOrder(image(once), video(once)),
  ),
  label(plainText(anyNumber), "group-text-after"),
));
