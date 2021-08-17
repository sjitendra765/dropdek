import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { label, text, video } from "../../../match/Matchers";
import { anyNumber, atLeast, once } from "../../../match/expressions/Occurring";

/**
 * v2: Centered Text + Video
 */
export const videoTextRemix = new Remix('video-text', {
  '& .container': {
    width: '100%',
    textAlign: 'center',
  },
  '& .group-text-before, & .group-text-after': {
    width: '100%',
    margin: '0 0 1em 0',
    '& .container:last-child *:last-child': { margin: '0', },
  },
  '& .group-text-after': {
    margin: '1em 0 0 0',
  },

  '& .videoContainer': {
    flexFlow: 'row',
    '& .videoPlayer': {
      flex: 'unset',
      minWidth: '20em',
    },
    '& iframe': {
      width: 'auto',
      margin: '0 auto',
    },
  },
},
when(
  label(text(atLeast(1)), "group-text-before"),
  video(once),
  label(text(anyNumber), "group-text-after"),
));
