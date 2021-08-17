import * as culori from "culori";
import { Remix } from "../../../Remix";
import { Animations } from "../../../effects/Animations";
import { when } from "../../../match/RemixRule";
import { image, inOrder, or, allText, heading, paragraph, code } from "../../../match/Matchers";
import { anyNumber, atLeast, once, exactly } from "../../../match/expressions/Occurring";

/**
 * i4: Single image, full bleed. Dark l-r text gradient background
 */
export const imageFullBleedTextGradientRemix = new Remix('image-1-fullbleed-textgradient', (colorChart) => ({
  '& .container-image': {
    zIndex: 0,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: '0 !important',
    height: 'auto !important',
    opacity: '0.8',
    '& .element': {
      margin: 0,
      overflow: "hidden",
      padding: 0,
    },
    '& .imgWrap img': {
      margin: 0,
      padding: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center center',
      position: "absolute",
    },
  },
  '& .container-heading-one, & .container-heading-two, & .container-paragraph, & .container-block-quote, & .container-bulleted-list, & .container-numbered-list': {
    zIndex: '1',
    maxWidth: '60%',
    textShadow: '0 0.02em 0.04em rgba(0,0,0,0.125)',
  },
  '& .container-heading-one, & .container-heading-two': {
    maxWidth: '100%',
  },
  '& .container-heading-one': {
    '& span.emphasis': {
      padding: '0 !important',
    },
  },
  '& .container-code': {
    zIndex: '1',
    maxWidth: '60%',
    background: 'transparent',
    backdropFilter: 'blur(10px) brightness(0.25)',
    marginTop: '0.5em',
  },
  '& .container-math': {
    zIndex: '1',
    maxWidth: '100%',
    '& .katex-display': {
      margin: '0.25em 0',
    },
  },
  '&:before': {
    // content: '""',
    // width: '100%',
    // height: '100%',
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // zIndex: '1',
    // "-webkit-transform": "translateZ(0)",
    // background: `linear-gradient(-90deg, ${culori.formatRgb({ ...culori.parse(colorChart.background()), alpha: 0 })} 0, ${culori.formatRgb({ ...culori.parse(colorChart.background()), alpha: 0 })} 30%, ${culori.formatRgb({ ...culori.parse(colorChart.background()), alpha: 0.8 })} 100%)`,
    // opacity: '0',
  },
}),[
  when(heading(exactly(1)), paragraph(anyNumber), image(once)).score(50),
  when(image(once), paragraph(anyNumber), heading(exactly(1))).score(50),

  when(image(once), heading(atLeast(1))).score(50),
  when(heading(atLeast(1)), image(once)).score(50),

  when(
    or(
      inOrder(allText(atLeast(1)), image(once), allText(anyNumber)),
      inOrder(allText(anyNumber), image(once), allText(atLeast(1))),
    )
  ).score(2),

],
{
  animation: Animations.imagePan()
});
