export const stylingFor2575 = ({
  textAlignment,
  marginAlignment,
  clusterImageMargin,
  containerImageAlignment,
}) => ({
  textAlign: 'left',
  alignItems: 'flex-start',
  '& .container-heading-one, & .container-heading-two, & .container-paragraph, & .container-bulleted-list, & .container-numbered-list, & .container-block-quote, & .container-code, & .container-math': {
    width: '69% !important',
    textAlign: 'left',
    alignSelf: textAlignment,
  },
  // clusters
  '& .cluster': {
    [marginAlignment]: 'auto',
    width: '69%',
    '& .container': {
      width: '100% !important',
    },
    '& .container-heading-one, & .container-heading-two, & .container-paragraph, & .container-bulleted-list, & .container-numbered-list, & .container-block-quote, & .container-code, & .container-math': {
      width: '100% !important',
    },
    '& .cluster': {
      width: '100%'
    },
  },
  // sequence contains cluster
  '& .sequence': {
    [marginAlignment]: 'auto',
    width: '69%',
    '& .cluster': {
      width: '100%',
    },
  },
  '& .cluster + .container-image + .cluster': {
    margin: clusterImageMargin,
  },
  // image
  '& .container-image': {
    position: 'absolute',
    width: '25% !important',
    top: '0',
    bottom: '0',
    [containerImageAlignment]: '0',
    margin: '0 !important',
    height: 'auto !important',
    '& .element': {
      width: '100% !important',
      alignSelf: 'flex-end !important',
      margin: '0 !important',
      '&:first-child:nth-last-child(2), &:first-child:nth-last-child(2) ~ .element': {
        height: '50%',
      },
      '&:first-child:nth-last-child(3), &:first-child:nth-last-child(3) ~ .element': {
        height: '33.3334%',
      },
      '&:first-child:nth-last-child(4), &:first-child:nth-last-child(4) ~ .element': {
        height: '25%',
      },
      '&:first-child:nth-last-child(5), &:first-child:nth-last-child(5) ~ .element': {
        height: '20%',
      },
      '& .imgWrap img': {
        objectFit: 'cover',
      },
    },
    // 6 images
    '&[data-length="6"]': {
      boxSizing: 'border-box',
      display: 'grid',
      gridGap: '0',
      gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
      height: '100% !important',
      '& .element': {
        height: 'auto !important',
        overflow: 'hidden',
        alignSelf: 'unset !important',
        '&:nth-child(1)': {
          gridRow: '1 / 5', // |
          gridColumn: '1 / 7', // -
        },
        '&:nth-child(2)': {
          gridRow: '1 / 5',
          gridColumn: '7 / 13',
        },
        '&:nth-child(3)': {
          gridRow: '5 / 9',
          gridColumn: '1 / 7',
        },
        '&:nth-child(4)': {
          gridRow: '5 / 9',
          gridColumn: '7 / 13',
        },
        '&:nth-child(5)': {
          gridRow: '9 / 13',
          gridColumn: '1 / 7',
        },
        '&:nth-child(6)': {
          gridRow: '9 / 13',
          gridColumn: '7 / 13',
        },
      },
      '& .imgWrap img': {
        height: '100%',
        width: '100%',
      },
    },
    // 7 images
    '&[data-length="7"]': {
      boxSizing: 'border-box',
      display: 'grid',
      gridGap: '0',
      gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
      height: '100% !important',
      '& .element': {
        height: 'auto !important',
        overflow: 'hidden',
        alignSelf: 'unset !important',
        '&:nth-child(1)': {
          gridRow: '1 / 4', // |
          gridColumn: '1 / 13', // -
        },
        '&:nth-child(2)': {
          gridRow: '4 / 7',
          gridColumn: '1 / 7',
        },
        '&:nth-child(3)': {
          gridRow: '4 / 7',
          gridColumn: '7 / 13',
        },
        '&:nth-child(4)': {
          gridRow: '7 / 10',
          gridColumn: '1 / 7',
        },
        '&:nth-child(5)': {
          gridRow: '7 / 10',
          gridColumn: '7 / 13',
        },
        '&:nth-child(6)': {
          gridRow: '10 / 13',
          gridColumn: '1 / 7',
        },
        '&:nth-child(7)': {
          gridRow: '10 / 13',
          gridColumn: '7 / 13',
        },
      },
      '& .imgWrap img': {
        height: '100%',
        width: '100%',
      },
    },
    // 8 images
    '&[data-length="8"]': {
      boxSizing: 'border-box',
      display: 'grid',
      gridGap: '0',
      gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
      height: '100% !important',
      '& .element': {
        height: 'auto !important',
        overflow: 'hidden',
        alignSelf: 'unset !important',
        '&:nth-child(1)': {
          gridRow: '1 / 4', // |
          gridColumn: '1 / 7', // -
        },
        '&:nth-child(2)': {
          gridRow: '1 / 4',
          gridColumn: '7 / 13',
        },
        '&:nth-child(3)': {
          gridRow: '4 / 7',
          gridColumn: '1 / 7',
        },
        '&:nth-child(4)': {
          gridRow: '4 / 7',
          gridColumn: '7 / 13',
        },
        '&:nth-child(5)': {
          gridRow: '7 / 10',
          gridColumn: '1 / 7',
        },
        '&:nth-child(6)': {
          gridRow: '7 / 10',
          gridColumn: '7 / 13',
        },
        '&:nth-child(7)': {
          gridRow: '10 / 13',
          gridColumn: '1 / 7',
        },
        '&:nth-child(8)': {
          gridRow: '10 / 13',
          gridColumn: '7 / 13',
        },
      },
      '& .imgWrap img': {
        height: '100%',
        width: '100%',
      },
    },
    // 9 images
    '&[data-length="9"]': {
      boxSizing: 'border-box',
      display: 'grid',
      gridGap: '0',
      gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
      height: '100% !important',
      '& .element': {
        height: 'auto !important',
        overflow: 'hidden',
        alignSelf: 'unset !important',
        '&:nth-child(1)': {
          gridRow: '1 / 4', // |
          gridColumn: '1 / 7', // -
        },
        '&:nth-child(2)': {
          gridRow: '1 / 4',
          gridColumn: '7 / 13',
        },
        '&:nth-child(3)': {
          gridRow: '4 / 7',
          gridColumn: '1 / 7',
        },
        '&:nth-child(4)': {
          gridRow: '4 / 7',
          gridColumn: '7 / 13',
        },
        '&:nth-child(5)': {
          gridRow: '7 / 10',
          gridColumn: '1 / 7',
        },
        '&:nth-child(6)': {
          gridRow: '7 / 10',
          gridColumn: '7 / 13',
        },
        '&:nth-child(7)': {
          gridRow: '10 / 13',
          gridColumn: '1 / 5',
        },
        '&:nth-child(8)': {
          gridRow: '10 / 13',
          gridColumn: '5 / 9',
        },
        '&:nth-child(9)': {
          gridRow: '10 / 13',
          gridColumn: '9 / 13',
        },
      },
      '& .imgWrap img': {
        height: '100%',
        width: '100%',
      },
    },
    // 10 images
    '&[data-length="10"]': {
      boxSizing: 'border-box',
      display: 'grid',
      gridGap: '0',
      gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
      height: '100% !important',
      '& .element': {
        height: 'auto !important',
        overflow: 'hidden',
        alignSelf: 'unset !important',
        '&:nth-child(1)': {
          gridRow: '1 / 7', // |
          gridColumn: '1 / 13', // -
        },
        '&:nth-child(2)': {
          gridRow: '7 / 9',
          gridColumn: '1 / 5',
        },
        '&:nth-child(3)': {
          gridRow: '7 / 9',
          gridColumn: '5 / 9',
        },
        '&:nth-child(4)': {
          gridRow: '7 / 9',
          gridColumn: '9 / 13',
        },
        '&:nth-child(5)': {
          gridRow: '9 / 11',
          gridColumn: '1 / 5',
        },
        '&:nth-child(6)': {
          gridRow: '9 / 11',
          gridColumn: '5 / 9',
        },
        '&:nth-child(7)': {
          gridRow: '9 / 11',
          gridColumn: '9 / 13',
        },
        '&:nth-child(8)': {
          gridRow: '11 / 13',
          gridColumn: '1 / 5',
        },
        '&:nth-child(9)': {
          gridRow: '11 / 13',
          gridColumn: '5 / 9',
        },
        '&:nth-child(10)': {
          gridRow: '11 / 13',
          gridColumn: '9 / 13',
        },
      },
      '& .imgWrap img': {
        height: '100%',
        width: '100%',
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
  // Code
  '& .container-code': {
    margin: '0.5em 0 1em 0', 
  },
});
