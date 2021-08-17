// rt6: 50t/50c text + code laid out in 2 rows
// -------------------------------------------
import { Remix } from "../../../Remix";
import { code, inOrder, label, or, allTextNoCode } from "../../../match/Matchers";
import { atLeast, once, exactly } from "../../../match/expressions/Occurring";
import { when } from "../../../match/RemixRule";

export const textCodeRowsRemix = new Remix('textcode-5050-rows',
  {
    padding: '0',
    textAlign: 'left',
    alignItems: 'flex-start',
    justifyContent: 'space-between !important',
    '& .text-wrap-before, & .text-wrap-after': {
      boxSizing: 'border-box',
      width: '100%',
      padding: '6% 9%',
    },
    '& .container-code': {
      boxSizing: 'border-box',
      borderRadius: 0,
      margin: '0 !important',
      flex: '1',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: 'auto',
      padding: '6% 9%',
      '& code': {
        margin: '0',
        background: 'transparent',
        padding: '0',
      },
    },
    // logos
    '& .container-logo': {
      '& *': { boxSizing: 'border-box', },
      margin: '0 0 1.5em 0',
      padding: '0',
      width: '45%',
      height: '3.5em',
      '& .element': {
        width: '45%',
        display: 'flex',
        '& .imgWrap img': {
          margin: '0 auto 0 0',
          width: 'auto',
          maxWidth: '100%',
        },
      },
    },
    // Math
    '& .container-math': {
      margin: '0 0 0.5em 0', 
      '& .katex-display': {
        margin: '0', 
      },
    },

  },[

    when(
      code(once),
    ).score(10),

    when(
      or(
        inOrder(
          label(allTextNoCode(atLeast(1)), "text-wrap-before"),
          code(),
        ),
        inOrder(
          code(),
          label(allTextNoCode(atLeast(1)), "text-wrap-after"),
        ),
      ),
    ),

    when(
      inOrder(
        code(),
        label(allTextNoCode(exactly(1)), "text-wrap-after"),
      ),
    ).score(50),

  ]);
