import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { image, label, plainText } from "../../../match/Matchers";
import { anyNumber, exactly } from "../../../match/expressions/Occurring";

/**
 * 4 images, quad layout, full bleed.
 */
export const imagesQuadFullBleed = new Remix('images-4-fullbleed', (colorChart) => ({
  justifyContent: 'center !important',
  alignItems: 'center !important',
  '& .container-heading-one, & .container-heading-two, & .container-paragraph': {
    textAlign: 'left',
  },
  '& .group-text-before, & .group-text-after': {
    padding: '1em 1.25em',
    background: `${colorChart.background()}`,
    boxShadow: '0 0.05em 0.05em rgba(0,0,0,0.2)',
    zIndex: '1',
    '& h1, & h2, & p': { width: 'auto', },
    // Quotes tweaked to fit container
    '& .container-block-quote': { width: '100%', paddingLeft: '1.125em', },
    // Margins reduced to bring text together more successfully:
    '& h1, & h2': { margin: '0 0 0.166em 0', },
    '& p': { margin: '0 0 0.322em 0', },
    // Margin removed on last element of last container:
    '& .container:last-child *:last-child': { margin: '0', },
    // Nested grouping reset styling:
    '& .group-text-before, & .group-text-after': {
      padding: '0',
      boxShadow: 'none',
    },
  },
  '& .sequence-image': {
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateRows: '1fr 1fr',
    gridTemplateColumns: '1fr 1fr',
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    '& .element': {
      height: '50%',
      width: '50%',
      position: 'absolute',
      '& .imgWrap img': {
        height: '100%',
        width: '100%',
        objectFit: 'cover',
      },
      '&:nth-of-type(1)': {
        top: '0',
        left: '0',
      },
      '&:nth-of-type(2)': {
        top: '0',
        right: '0',
      },
      '&:nth-of-type(3)': {
        bottom: '0',
        left: '0',
      },
      '&:nth-of-type(4)': {
        bottom: '0',
        right: '0',
      },
    },
  },
}),[
  when(image(exactly(4))).score(10),
  when(
    label(plainText(anyNumber), "group-text-before"),
    image(exactly(4)),
    label(plainText(anyNumber), "group-text-after"),
  )
]);
