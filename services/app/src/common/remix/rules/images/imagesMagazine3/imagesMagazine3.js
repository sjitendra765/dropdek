import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { image, label, plainText } from "../../../match/Matchers";
import { anyNumber, exactly } from "../../../match/expressions/Occurring";

/**
 * 3 images, magazine layout. First image 100h/50w. Remaining two 50h/50w right stacked.
 */
export const imagesMagazine3Remix = new Remix('images-3-magazine', {
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
      '&:nth-child(1)': {
        gridRow: '1 / 3',
      },
    },
    '& .imgWrap img': {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
    },
  },
},[
  when(image(exactly(3))).score(15),
  when(
    label(plainText(anyNumber), "group-text-before"),
    image(exactly(3)),
    label(plainText(anyNumber), "group-text-after"),
  )
]);
