import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { plainText, label, image } from "../../../match/Matchers";
import { anyNumber, between, exactly } from "../../../match/expressions/Occurring";

/**
 * 4 images, quad layout, aspect ratios maintained.
 */
export const imagesQuadAspect = new Remix('images-4-quad-aspect', {
  '& .container-heading-one, & .container-heading-two, & .container-paragraph': {
    width: '100%',
    textAlign: 'left',
  },
  '& .group-text-before, & .group-text-after': {
    width: '100%',
    margin: '0 0 1em 0',
    // Image focussed remix: text reduced in size
    fontSize: '80%',
    // Margins reduced to bring text together more successfully:
    '& h1, & h2': { margin: '0 0 0.166em 0', },
    '& p': { margin: '0 0 0.322em 0', },
    // Margin removed on last element of last container:
    '& .container:last-child *:last-child': { margin: '0', },
  },
  '& .group-text-after': {
    margin: '1em 0 0 0',
  },
  '& .sequence-image': {
    boxSizing: 'border-box',
    display: 'grid',
    gridGap: '14% 7%',
    gridTemplateRows: '1fr 1fr',
    gridTemplateColumns: '1fr 1fr',
    '& .element': {
      height: 'auto',
      overflow: 'hidden',
    },
    '& .imgWrap img': {
      height: '100%',
      width: '100%',
      objectFit: 'contain',
    },
  },
},
when(
  label(plainText(anyNumber), "group-text-before"),
  image(exactly(4)),
  label(plainText(anyNumber), "group-text-after"),
));
