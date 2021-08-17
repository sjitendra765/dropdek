import { Remix } from "../../../Remix";
import { atLeast } from "../../../match/expressions/Occurring";
import { chart, inOrder, or, text } from "../../../match/Matchers";
import { when } from "../../../match/RemixRule";

// ch1: 50t/50i
export const textChartColumnRemix = new Remix('text-chart-5050',
  {
    textAlign: 'left',
    alignItems: 'flex-start',
    '& .container-heading-one, & .container-heading-two, & .container-paragraph, & .container-bulleted-list, & .container-numbered-list, & .container-block-quote': {
      width: '45%',
      textAlign: 'left',
      alignSelf: 'flex-start !important',
    },
    '& .container-block-quote': {
      width: '40%',
    },
    '& .container-chart': {
      position: 'absolute',
      width: '46% !important', // 39 - 46
      top: '13%',
      bottom: '0',
      right: '7%',
      margin: '0 !important',
      height: 'auto !important',
      maxHeight: '74%',
    },
  },
  when(
    or(
      inOrder(text(atLeast(1)), chart()),
      inOrder(chart(), text(atLeast(1))),
    )
  ));
