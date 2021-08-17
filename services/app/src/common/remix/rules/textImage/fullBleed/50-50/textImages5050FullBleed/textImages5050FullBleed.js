import { Remix } from "../../../../../Remix";
import { when } from "../../../../../match/RemixRule";
import { allText, code, heading, image, inOrder, math, or, paragraph, quote } from "../../../../../match/Matchers";
import { anyNumber, atLeast, between, exactly, once } from "../../../../../match/expressions/Occurring";
import { stylingFor5050 } from "../stylingFor5050";
import { matchSplitImageSequences } from "../matchSplitImageSequences";
import { matchTextOrCluster } from "../../../matchTextOrCluster";
import { sortImagesFirst } from "../../../../../transforms/sortImagesFirst";

/**
 * Declare the CSS generated for this remix.
 */
const css = stylingFor5050({
  textAlignment: 'flex-start !important',
  marginAlignment: 'marginRight',
  clusterImageMargin: '-0.75em 0 0 0',
  containerImageAlignment: 'right',
  groupTextAlignment: 'left',
});

/**
 * Fallback version which "pulls out" all images to one side before evaluation.
 */
const textImages5050FullBleedFallback = new Remix(
  'textimages-5050-fullbleed-fallback',
  css,
  when(
    inOrder(
      image(between(1, 12)),
      matchTextOrCluster,
    ),
  ),
  {
    // We apply a "magnet" transformation to list out all the images first, followed by
    // the rest of the content on the slide. The rule above runs after this transformation.
    transform: sortImagesFirst,
  }
);

/**
 * 50t/50i full bleed images (up to 12)
 */
export const textImages5050FullBleedRemix = new Remix(
  'textimages-5050-fullbleed',
  css,
  [
    when(
      heading(exactly(1)),
      paragraph(anyNumber),
      quote(anyNumber),
      code(anyNumber),
      math(anyNumber),
      image(between(1, 12))
    ).score(45),

    when(
      paragraph(atLeast(1)),
      image(between(1, 12))
    ).score(5),

    when(
      or(
        inOrder(allText(atLeast(1)), image(once), allText(anyNumber)),
        inOrder(allText(anyNumber), image(once), allText(atLeast(1))),
      )
    ).score(5),

    when(
      or(
        inOrder(heading(atLeast(2)), image(once), heading(anyNumber)),
        inOrder(heading(anyNumber), image(once), heading(atLeast(2))),
      )
    ).score(50),

    // This rule allows for more complex content in the img-text column
    matchSplitImageSequences(),
  ],
  {
    clustering: false,
  }
).then(textImages5050FullBleedFallback);
