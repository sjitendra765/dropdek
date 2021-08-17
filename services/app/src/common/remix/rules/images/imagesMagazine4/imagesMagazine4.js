//  i12:   4 images, magazine layout. First image 100w. Remaining three 33w right spread.
//  ------------------------------------------------------------------------------
import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { image, label, plainText } from "../../../match/Matchers";
import { anyNumber, exactly, between } from "../../../match/expressions/Occurring";

export const imagesMagazine4Remix = new Remix('images-4-magazine', {
  '& .container-heading-one, & .container-heading-two, & .container-paragraph': {
    width: '100%',
    textAlign: 'left',
  },
  '& .group-text-before, & .group-text-after': {
    width: '100%',
    margin: '0 0 1em 0',
    fontSize: '80%',
    '& h1, & h2': { margin: '0 0 0.166em 0', },
    '& p': { margin: '0 0 0.322em 0', },
    '& .container:last-child *:last-child': { margin: '0', },
  },
  '& .group-text-after': {
    margin: '1em 0 0 0',
  },
  '& .sequence-image': {
    boxSizing: 'border-box',
    display: 'grid',
    gridGap: '10% 5%',
    gridTemplateRows: '2fr 1fr',
    gridTemplateColumns: '1fr 1fr 1fr',
    '& .element': {
      height: 'auto',
      overflow: 'hidden',
      '&:nth-child(1)': {
        gridColumn: '1 / 4',
      },
    },
    '& .imgWrap img': {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
    },
    '&[data-length="5"]': {
      gridTemplateRows: '2fr 1fr',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      '& .element:nth-child(1)': {
        gridColumn: '1 / 5',
      },
    },
    '&[data-length="6"]': {
      gridTemplateRows: '1fr 1fr 1fr',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      '& .element:nth-child(1)': {
        gridColumn: '1 / 3',
        gridRow: '1 / 3',
      },
      '& .element:nth-child(2)': {
        gridColumn: '1 / 2',
        gridRow: '3 / 4',
      },
      '& .element:nth-child(3)': {
        gridColumn: '2 / 3',
        gridRow: '3 / 4',
      },
      '& .element:nth-child(6)': {
        gridColumn: '3 / 5',
        gridRow: '2 / 4',
      },
    },
    '&[data-length="7"]': {
      gridTemplateRows: '1fr 1fr 1fr',
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
      '& .element:nth-child(1)': {
        gridColumn: '1 / 4',
        gridRow: '1 / 4',
      },
      '& .element:nth-child(2)': {
        gridColumn: '4 / 5',
        gridRow: '1 / 2',
      },
    },
    '&[data-length="8"]': {
      gridTemplateRows: '1fr 1fr',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      '& .element:nth-child(1)': {
        gridColumn: '1 / 2',
        gridRow: '1 / 2',
      },
    },
    '&[data-length="9"]': {
      gridTemplateRows: '1fr 1fr 1fr',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      '& .element:nth-child(1)': {
        gridColumn: '1 / 3',
        gridRow: '1 / 3',
      },
      '& .element:nth-child(2)': {
        gridColumn: '1 / 2',
        gridRow: '3 / 4',
      },
      '& .element:nth-child(3)': {
        gridColumn: '2 / 3',
        gridRow: '3 / 4',
      },
    },
    '&[data-length="10"]': {
      gridTemplateRows: '1fr 1fr 1fr 1fr 1fr',
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
      '& .element:nth-child(1)': {
        gridRow: '1 / 4',
        gridColumn: '1 / 7',
      },
      '& .element:nth-child(2)': {
        gridRow: '5 / 4',
        gridColumn: '1 / 4',
      },
      '& .element:nth-child(3)': {
        gridRow: '5 / 4',
        gridColumn: '4 / 7',
      },
      '& .element:nth-child(4)': {
        gridRow: '5 / 6',
        gridColumn: '1 / 4',
      },
      '& .element:nth-child(5)': {
        gridRow: '5 / 6',
        gridColumn: '4 / 7',
      },
      '& .element:nth-child(6)': {
        gridRow: '1 / 2',
        gridColumn: '7 / 10',
      },
      '& .element:nth-child(7)': {
        gridRow: '1 / 2',
        gridColumn: '10 / 13',
      },
      '& .element:nth-child(8)': {
        gridRow: '2 / 3',
        gridColumn: '7 / 10',
      },
      '& .element:nth-child(9)': {
        gridRow: '2 / 3',
        gridColumn: '10 / 13',
      },
      '& .element:nth-child(10)': {
        gridRow: '3 / 6',
        gridColumn: '7 / 13',
      },
    },
    '&[data-length="11"]': {
      gridTemplateRows: '1fr 1fr 1fr 1fr 1fr',
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
      '& .element:nth-child(1)': {
        gridRow: '1 / 5',
        gridColumn: '1 / 7',
      },
      '& .element:nth-child(2)': {
        gridRow: '1 / 3',
        gridColumn: '7 / 10',
      },
      '& .element:nth-child(3)': {
        gridRow: '1 / 3',
        gridColumn: '10 / 13',
      },
      '& .element:nth-child(4)': {
        gridRow: '3 / 5',
        gridColumn: '7 / 10',
      },
      '& .element:nth-child(5)': {
        gridRow: '3 / 5',
        gridColumn: '10 / 13',
      },
      '& .element:nth-child(6)': {
        gridRow: '5 / 6',
        gridColumn: '1 / 3',
      },
      '& .element:nth-child(7)': {
        gridRow: '5 / 6',
        gridColumn: '3 / 5',
      },
      '& .element:nth-child(8)': {
        gridRow: '5 / 6',
        gridColumn: '5 / 7',
      },
      '& .element:nth-child(9)': {
        gridRow: '5 / 6',
        gridColumn: '7 / 9',
      },
      '& .element:nth-child(10)': {
        gridRow: '5 / 6',
        gridColumn: '9 / 11',
      },
      '& .element:nth-child(11)': {
        gridRow: '5 / 6',
        gridColumn: '11 / 13',
      },
    },
    '&[data-length="12"]': {
      gridTemplateRows: '1fr 1fr 1fr',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      '& .element:nth-child(1)': {
        gridColumn: '1 / 2',
        gridRow: '1 / 2',
      },
    },
  },
},[
  when(image(between(4, 12))).score(15),
  when(
    label(plainText(anyNumber), "group-text-before"),
    image(between(4, 12)),
    label(plainText(anyNumber), "group-text-after"),
  ),
]);
