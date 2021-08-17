import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { plainText, label, image } from "../../../match/Matchers";
import { anyNumber, between, exactly } from "../../../match/expressions/Occurring";

/**
 * 2-4 images, aligned horizontally, aspect ratios maintained.
 */
export const imagesAspectRemix = new Remix('images-n-aspect', {
  '& .container-heading-one, & .container-heading-two, & .container-paragraph': {
    width: '100%',
    textAlign: 'center',
  },
  '& .group-text-before, & .group-text-after': {
    width: '100%',
    margin: '0 0 1em 0',
    '& h1, & h2, & p': {
      margin: '0 !important',
      lineHeight: '1.4',
    },
  },
  '& .group-text-before[data-length="1"], & .group-text-after[data-length="1"]': {
    '& h1, & h2': {
      lineHeight: '1',
    },
    '& p': {
      lineHeight: '1.5',
    },
  },
  '& .sequence-image + .group-text-after': {
    margin: '1em 0 0 0',
  },
  '& .sequence-image': {
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateRows: '100%',
    '& img': {
      height: '100%',
      width: '100%',
      objectFit: 'contain',
    },
  },
  '& .sequence-image[data-length="2"]': {
    gridGap: '7%',
    gridTemplateColumns: '1fr 1fr',
  },
  '& .sequence-image[data-length="3"]': {
    gridGap: '5%',
    gridTemplateColumns: '1fr 1fr 1fr',
  },
  '& .sequence-image[data-length="4"]': {
    gridGap: '3%',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
  },
  '& .sequence-image[data-length="5"]': {
    gridGap: '3%',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
  },
  '& .sequence-image[data-length="6"]': {
    gridGap: '3%',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr',
  },

},
when(
  label(plainText(anyNumber), "group-text-before"),
  image(between(2, 6)),
  label(plainText(anyNumber), "group-text-after"),
));
