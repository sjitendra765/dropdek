import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { image, label, plainText } from "../../../match/Matchers";
import { anyNumber, between } from "../../../match/expressions/Occurring";

/**
 * 2-4 images, aligned horizontally, windowed bleed. (images stop at gutter).
 */
export const imagesWindowedRemix = new Remix('images-n-windowed', {
  '& .container-heading-one, & .container-heading-two, & .container-paragraph': {
    width: '100%',
    textAlign: 'left',
    '& H1': {
      margin: '0 0 0.65em 0',
    },
    '& H2': {
      margin: '0 0 0.5em 0',
    },
    '& P': {
      fontSize: '0.9em',
      margin: '0 0 0.5em 0',
    },
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
      objectFit: 'cover',
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
    gridGap: '6% 3%',
    gridTemplateRows: '1fr 1fr',
    gridTemplateColumns: '1fr 1fr 1fr',
    '& .imgWrap:nth-child(1)': {
      gridRow: '1 / 2',
      gridColumn: '1 / 2',
    },
    '& .imgWrap:nth-child(2)': {
      gridRow: '1 / 2',
      gridColumn: '2 / 3',
    },
    '& .imgWrap:nth-child(3)': {
      gridRow: '1 / 2',
      gridColumn: '3 / 4',
    },
  },
},
when(
  label(plainText(anyNumber), "group-text-before"),
  image(between(2, 6)),
  label(plainText(anyNumber), "group-text-after"),
));
