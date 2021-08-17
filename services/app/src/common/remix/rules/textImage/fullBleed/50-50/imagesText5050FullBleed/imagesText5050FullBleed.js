import { Remix } from "../../../../../Remix";
import { when } from "../../../../../match/RemixRule";
import { heading, image, inOrder, or, paragraph } from "../../../../../match/Matchers";
import { anyNumber, atLeast, between, exactly, once } from "../../../../../match/expressions/Occurring";
import { sortImagesFirst } from "../../../../../transforms/sortImagesFirst";
import { matchTextOrCluster } from "../../../matchTextOrCluster";
import { stylingFor5050 } from "../stylingFor5050";
import { matchSplitImageSequences } from "../matchSplitImageSequences";

/**
 * Declare the CSS generated for this remix.
 */
const css = stylingFor5050({
  textAlignment: 'flex-end !important',
  marginAlignment: 'marginLeft',
  clusterImageMargin: '-0.75em 0 0 auto',
  containerImageAlignment: 'left',
  groupTextAlignment: 'right',
});

/**
 * Fallback version which "pulls out" all images to one side before evaluation.
 */
const imagesText5050FullBleedFallback = new Remix(
  'imagestext-5050-fullbleed-fallback',
  css,
  when(
    inOrder(
      image(between(1, 12)),
      matchTextOrCluster,
    ),
  ).score(55),
  {
    // We apply a "magnet" transformation to list out all the images first, followed by
    // the rest of the content on the slide. The rule above runs after this transformation.
    transform: sortImagesFirst,
  }
);

/**
 * 50t/50i full bleed images (up to 4 stacked)
 */
export const imagesText5050FullBleedRemix = new Remix(
  'imagestext-5050-fullbleed',
  css,
  [
  // boost when at least 1 heading + optional para + 1 image
    when(
      or(
        inOrder(heading(exactly(1)), image(once), paragraph(anyNumber)),
        inOrder(heading(exactly(1)), paragraph(anyNumber), image(once)),
        inOrder(paragraph(anyNumber), image(once), heading(atLeast(1))),
      )
    ).score(55),

    // This rule allows for more complex content in the img-text column
    matchSplitImageSequences(),
  ],
  {
    clustering: false,
  }
).then(imagesText5050FullBleedFallback);

// when(
//   or(
//     inOrder(
//       textList(atLeast(1)),
//       image(between(1, 12)),
//       textList(anyNumber),
//     ),
//     inOrder(
//       textList(anyNumber),
//       image(between(1, 12)),
//       textList(atLeast(1)),
//     ),
//     inOrder(
//       cluster(textList(atLeast(1)), atLeast(1)),
//       image(between(1, 12)),
//     ),
//     inOrder(
//       image(between(1, 12)),
//       cluster(textList(atLeast(1)), atLeast(1)),
//     ),
//     inOrder(
//       cluster(textList(atLeast(1)), atLeast(1)),
//       image(between(1, 12)),
//       cluster(textList(atLeast(1)), atLeast(1)),
//     ),
//   ),
// ),
