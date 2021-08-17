import { Remix } from "../../../../../Remix";
import { when } from "../../../../../match/RemixRule";
import { image, inOrder } from "../../../../../match/Matchers";
import { between } from "../../../../../match/expressions/Occurring";
import { sortImagesFirst } from "../../../../../transforms/sortImagesFirst";
import { matchTextOrCluster } from "../../../matchTextOrCluster";
import { stylingFor2575 } from "../stylingFor2575";

/**
* REVERSED 75t/25i full bleed single image (additional images stack)
*/
export const imagesText2575FullBleedRemix = new Remix(
  'imagestext-2575-fullbleed',
  stylingFor2575({
    textAlignment: 'flex-start !important',
    marginAlignment: 'marginRight',
    clusterImageMargin: '-0.75em auto 0 0',
    containerImageAlignment: 'right',
  }),

  // This rule says: slide should contain, in any order:
  // - between 1-10 images
  // - at least 1 text/list OR cluster of text/list
  when(
    inOrder(
      image(between(1, 10)),
      matchTextOrCluster,
    ),
  ),
  {
    // We apply a "magnet" transformation to list out all the images first, followed by
    // the rest of the content on the slide. The rule above runs after this transformation.
    transform: sortImagesFirst,
  }
);

// when(
//   or(
//     inOrder(
//       textList(atLeast(1)),
//       image(between(1, 10)),
//       textList(anyNumber),
//     ),
//     inOrder(
//       textList(anyNumber),
//       image(between(1, 10)),
//       textList(atLeast(1)),
//     ),
//     inOrder(
//       cluster(textList(atLeast(1)), atLeast(1)),
//       image(between(1, 10)),
//     ),
//     inOrder(
//       image(between(1, 10)),
//       cluster(textList(atLeast(1)), atLeast(1)),
//     ),
//     inOrder(
//       cluster(textList(atLeast(1)), atLeast(1)),
//       image(between(1, 10)),
//       cluster(textList(atLeast(1)), atLeast(1)),
//     ),
//   )
// ));
