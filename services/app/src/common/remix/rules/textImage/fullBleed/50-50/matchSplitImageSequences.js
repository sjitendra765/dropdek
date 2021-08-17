import { when } from "../../../../match/RemixRule";
import { allText, anyElement, cluster, image, inOrder, label, or } from "../../../../match/Matchers";
import { atMost, between, Occurring, once } from "../../../../match/expressions/Occurring";
import { ComponentMatcher } from "../../../../match/expressions/ComponentMatcher";
import { IMAGE } from "../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { CODE } from "../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/code/type";
import { HEADING_ONE } from "../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { BULLETED_LIST } from "../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/list/bulleted/type";
import { NUMBERED_LIST } from "../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/list/numbered/type";
import { MATH } from "../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/math/type";
import { BLOCK_QUOTE } from "../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/quote/type";
import { PARAGRAPH } from "../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

export const textImage = (occurrence = Occurring.once) => new ComponentMatcher([PARAGRAPH, HEADING_ONE, HEADING_TWO, BLOCK_QUOTE, BULLETED_LIST, NUMBERED_LIST, CODE, MATH, IMAGE], occurrence);

export const matchSplitImageSequences = () => when(
  label(
    inOrder(
      textImage(atMost(15)), // apply a cap
      // The following clause defines the element that should "break" between the two columns:
      or(
        allText(once),
        cluster(anyElement(), once),
      )
    ), "img-text"
  ),
  label(image(between(1, 12)), "group-images"),
).score(5);
