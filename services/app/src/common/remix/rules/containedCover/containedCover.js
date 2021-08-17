import { Remix } from "../../Remix";
import { Animations } from "../../effects/Animations";
import { when } from "../../match/RemixRule";
import { image, inOrder, label, or, plainText } from "../../match/Matchers";
import { atLeast, once } from "../../match/expressions/Occurring";

const fontSettings = (colorChart, title) => {
  const settings = {
  };
  if (colorChart) {
    settings.color = title ? `${colorChart.title()}` : `${colorChart.text()}`;
  }
  return settings;
};

// styles
const boxOutCss = (colorChart) => ({
  justifyContent: 'center !important', // |
  alignItems: ' flex-start !important', // -
  '& .group-text-before, & .group-text-after': {
    zIndex: '1',
    padding: '1.5em 1.75em',
    width: '41%',
    borderRadius: '0.125em',
  },
  // container/box
  '&.boxouttext .group-text-before, &.boxouttext-r .group-text-before, &.boxouttext .group-text-after, &.boxouttext-r .group-text-after': {
    background: `${colorChart.background()}`,
    boxShadow: '0 0.125em 0.25em rgba(0,0,0,0.15)',
    '& .group-text-before, & .group-text-after': {
      width: '100%',
      padding: '0',
      margin: '0',
      boxShadow: 'none',
      background: 'transparent',
    },
    '& .container:last-child *:last-of-type': {
      marginBottom: '0',
    },
  },
  '&.boxouttext-r': {
    alignItems: 'flex-end !important',
  },
  // bg image
  '& .container-image': {
    border: '0',
    zIndex: '0',
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    margin: '0 !important',
    height: 'auto !important',
    width: '100%',
    padding: '0',
    '& .element': {
      margin: '0',
      overflow: "hidden",
      padding: '0',
    },
    '& .imgWrap img': {
      margin: '0',
      padding: '0',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center center',
      position: "absolute",
    },
  },
  '& .container-heading-one, & .container-heading-two, & .container-bulleted-list, & .container-numbered-list, & .container-block-quote, & .container-paragraph': {
    width: 'auto',
    '& H1, & H2': fontSettings(colorChart, true),
    '& p, & blockquote, & ol, & ul': fontSettings(colorChart),
    '& ol, & ul': {
      marginTop: '0.6em',
    },
  },
});

const imageCoverRule = when(
  or(
    inOrder(
      label(plainText(atLeast(1)), "group-text-before"),
      image(once)
    ),
    inOrder(
      image(once),
      label(plainText(atLeast(1)), "group-text-after")
    ),
  )
);

/**
 * Full Bleed BG. Text boxout is 50% wide, coloured background, and offset left.
 */

export const boxOutTextLeftRemix = new Remix('boxouttext',
  (colorChart) => boxOutCss(colorChart),
  imageCoverRule,
  {
    animation: Animations.imagePan()
  });

export const boxOutTextRightRemix = new Remix('boxouttext-r',
  (colorChart) => boxOutCss(colorChart),
  imageCoverRule,
  {
    animation: Animations.imagePan()
  });
