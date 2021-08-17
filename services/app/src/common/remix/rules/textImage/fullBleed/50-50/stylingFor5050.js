export const stylingFor5050 = ({
  textAlignment,
  marginAlignment,
  clusterImageMargin,
  containerImageAlignment,
  groupTextAlignment,
}) => ({
  textAlign: 'left',
  alignItems: 'flex-start',
  '& .container-heading-one, & .container-heading-two, & .container-paragraph, & .container-bulleted-list, & .container-numbered-list, & .container-block-quote, & .container-code, & .container-math, & .container-table': {
    width: '45%',
    textAlign: 'left',
    alignSelf: textAlignment,
  },
  // cluster + nested cluster
  '& .cluster': {
    [marginAlignment]: 'auto',
    width: '45%',
    '& .container': {
      width: '100% !important',
    },
    '& .container-heading-one, & .container-heading-two, & .container-paragraph, & .container-bulleted-list, & .container-numbered-list, & .container-block-quote, & .container-code, & .container-math, & .container-table': {
      width: '100% !important',
    },
    '& .cluster': { width: '100%' },
  },
  // sequence contains cluster
  '& .sequence': {
    [marginAlignment]: 'auto',
    width: '45%',
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
    width: '46% !important',
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
      '& .imgWrap img': {
        objectFit: 'cover',
      },
    },
    // 5 images
    '&[data-length="5"]': {
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
          gridRow: '1 / 10',
          gridColumn: '1 / 13',
        },
        '&:nth-child(2)': {
          gridRow: '10 / 13',
          gridColumn: '1 / 4',
        },
        '&:nth-child(3)': {
          gridRow: '10 / 13',
          gridColumn: '4 / 7',
        },
        '&:nth-child(4)': {
          gridRow: '10 / 13',
          gridColumn: '7 / 10',
        },
        '&:nth-child(5)': {
          gridRow: '10 / 13',
          gridColumn: '10 / 13',
        },
      },
      '& .imgWrap img': {
        height: '100%',
        width: '100%',
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
          gridRow: '1 / 8',
          gridColumn: '1 / 13',
        },
        '&:nth-child(2)': {
          gridRow: '8 / 11',
          gridColumn: '1 / 7',
        },
        '&:nth-child(3)': {
          gridRow: '8 / 11',
          gridColumn: '7 / 13',
        },
        '&:nth-child(4)': {
          gridRow: '11 / 13',
          gridColumn: '1 / 5',
        },
        '&:nth-child(5)': {
          gridRow: '11 / 13',
          gridColumn: '5 / 9',
        },
        '&:nth-child(6)': {
          gridRow: '11 / 13',
          gridColumn: '9 / 13',
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
          gridRow: '1 / 7',
          gridColumn: '1 / 13',
        },
        '&:nth-child(2)': {
          gridRow: '7 / 10',
          gridColumn: '1 / 5',
        },
        '&:nth-child(3)': {
          gridRow: '7 / 10',
          gridColumn: '5 / 9',
        },
        '&:nth-child(4)': {
          gridRow: '7 / 10',
          gridColumn: '9 / 13',
        },
        '&:nth-child(5)': {
          gridRow: '10 / 13',
          gridColumn: '1 / 5',
        },
        '&:nth-child(6)': {
          gridRow: '10 / 13',
          gridColumn: '5 / 9',
        },
        '&:nth-child(7)': {
          gridRow: '10 / 13',
          gridColumn: '9 / 13',
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
          gridRow: '1 / 4',
          gridColumn: '1 / 7',
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
          gridRow: '1 / 9', // |
          gridColumn: '1 / 13', // -
        },
        '&:nth-child(2)': {
          gridRow: '9 / 11',
          gridColumn: '1 / 4',
        },
        '&:nth-child(3)': {
          gridRow: '9 / 11',
          gridColumn: '4 / 7',
        },
        '&:nth-child(4)': {
          gridRow: '9 / 11',
          gridColumn: '7 / 10',
        },
        '&:nth-child(5)': {
          gridRow: '9 / 11',
          gridColumn: '10 / 13',
        },
        '&:nth-child(6)': {
          gridRow: '11 / 13',
          gridColumn: '1 / 4',
        },
        '&:nth-child(7)': {
          gridRow: '11 / 13',
          gridColumn: '4 / 7',
        },
        '&:nth-child(8)': {
          gridRow: '11 / 13',
          gridColumn: '7 / 10',
        },
        '&:nth-child(9)': {
          gridRow: '11 / 13',
          gridColumn: '10 / 13',
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
    // 11 images
    '&[data-length="11"]': {
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
          gridColumn: '1 / 4',
        },
        '&:nth-child(9)': {
          gridRow: '11 / 13',
          gridColumn: '4 / 7',
        },
        '&:nth-child(10)': {
          gridRow: '11 / 13',
          gridColumn: '7 / 10',
        },
        '&:nth-child(11)': {
          gridRow: '11 / 13',
          gridColumn: '10 / 13',
        },
      },
      '& .imgWrap img': {
        height: '100%',
        width: '100%',
      },
    },
    // 12 images
    '&[data-length="12"]': {
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
          gridColumn: '1 / 5', // -
        },
        '&:nth-child(2)': {
          gridRow: '1 / 4',
          gridColumn: '5 / 9',
        },
        '&:nth-child(3)': {
          gridRow: '1 / 4',
          gridColumn: '9 / 13',
        },
        '&:nth-child(4)': {
          gridRow: '4 / 7',
          gridColumn: '1 / 5',
        },
        '&:nth-child(5)': {
          gridRow: '4 / 7',
          gridColumn: '5 / 9',
        },
        '&:nth-child(6)': {
          gridRow: '4 / 7',
          gridColumn: '9 / 13',
        },
        '&:nth-child(7)': {
          gridRow: '7 / 10',
          gridColumn: '1 / 5',
        },
        '&:nth-child(8)': {
          gridRow: '7 / 10',
          gridColumn: '5 / 9',
        },
        '&:nth-child(9)': {
          gridRow: '7 / 10',
          gridColumn: '9 / 13',
        },
        '&:nth-child(10)': {
          gridRow: '10 / 13',
          gridColumn: '1 / 5',
        },
        '&:nth-child(11)': {
          gridRow: '10 / 13',
          gridColumn: '5 / 9',
        },
        '&:nth-child(12)': {
          gridRow: '10 / 13',
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
  
  // ----------------------------------------------------------------------
  // Container : Text + Images (1-12) Together
  // ----------------------------------------------------------------------

  '& .group.img-text': {
    width: '36%',
    textAlign: 'left',
    // THEO: DO WE NEED THIS?
    // position: 'absolute',
    display: 'block',
    top: '9%',
    alignSelf: textAlignment,
    [groupTextAlignment]: '9%',
    // text
    '& .container.container': {
      width: '100% !important',
    },
    // all images
    '& .container.container-image': {
      marginBottom: '1.75em !important',
      maxWidth: '100%',
      width: '100% !important',
      height: 'auto',
      maxHeight: '10em',
      position: 'static',
      display: 'grid',
      gridTemplateRows: '1fr',
      gridTemplateColumns: '1fr',
      gridGap: '0',
      boxSizing: 'border-box',
      '& .element': {
        position: 'static',
        border: '0 !important',
        boxSizing: 'border-box',
        gridRow: '1 / 2', // |
        gridColumn: '1 / 2', // -
        '&:nth-of-type(1), &:nth-of-type(2), &:nth-of-type(3), &:nth-of-type(4), &:nth-of-type(5), &:nth-of-type(6)': {
          boxSizing: 'border-box',
          height: '100% !important',
          width: '100% !important',
          border: '0',
          display: 'block !important',
        },
        '& .imgWrap img': {
          boxSizing: 'border-box',
          height: '100%',
          border: '0 !important',
        },
      },
      // 2 images
      '&[data-length="2"]': {
        gridTemplateRows: '1fr',
        gridTemplateColumns: '1fr 1fr',
        '& .element': {
          '&:nth-child(1)': {
            gridRow: '1 / 3', // |
            gridColumn: '1 / 2', // -
          },
          '&:nth-child(2)': {
            gridRow: '1 / 3',
            gridColumn: '2 / 3',
          },
        },
      },
      // 3 images
      '&[data-length="3"]': {
        gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        '& .element': {
          '&:nth-child(1)': {
            gridRow: '1 / 7', // |
            gridColumn: '1 / 13', // -
          },
          '&:nth-child(2)': {
            gridRow: '7 / 13',
            gridColumn: '1 / 7',
          },
          '&:nth-child(3)': {
            gridRow: '7 / 13',
            gridColumn: '7 / 13',
          },
        },
      },
      // 4 images
      '&[data-length="4"]': {
        gridTemplateRows: '1fr 1fr',
        gridTemplateColumns: '1fr 1fr',
        '& .element': {
          '&:nth-child(1)': {
            gridRow: '1 / 2', // |
            gridColumn: '1 / 2', // -
          },
          '&:nth-child(2)': {
            gridRow: '1 / 2',
            gridColumn: '2 / 3',
          },
          '&:nth-child(3)': {
            gridRow: '2 / 3',
            gridColumn: '1 / 2',
          },
          '&:nth-child(4)': {
            gridRow: '2 / 3',
            gridColumn: '2 / 3',
          },
        },
      },
      // 5 images
      '&[data-length="5"]': {
        gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        '& .element': {
          '&:nth-child(1)': {
            gridRow: '1 / 7', // |
            gridColumn: '1 / 7', // -
          },
          '&:nth-child(2)': {
            gridRow: '1 / 7',
            gridColumn: '7 / 13',
          },
          '&:nth-child(3)': {
            gridRow: '7 / 13',
            gridColumn: '1 / 5',
          },
          '&:nth-child(4)': {
            gridRow: '7 / 13',
            gridColumn: '5 / 9',
          },
          '&:nth-child(5)': {
            gridRow: '7 / 13',
            gridColumn: '9 / 13',
          },
        },
      },
      // 6 images
      '&[data-length="6"]': {
        gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        '& .element': {
          '&:nth-child(1)': {
            gridRow: '1 / 7', // |
            gridColumn: '1 / 5', // -
          },
          '&:nth-child(2)': {
            gridRow: '1 / 7',
            gridColumn: '5 / 9',
          },
          '&:nth-child(3)': {
            gridRow: '1 / 7',
            gridColumn: '9 / 13',
          },
          '&:nth-child(4)': {
            gridRow: '7 / 13',
            gridColumn: '1 / 5',
          },
          '&:nth-child(5)': {
            gridRow: '7 / 13',
            gridColumn: '5 / 9',
          },
          '&:nth-child(6)': {
            gridRow: '7 / 13',
            gridColumn: '9 / 13',
          },
        },
      },
      // 7 images
      '&[data-length="7"]': {
        gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        '& .element': {
          '&:nth-child(1)': {
            gridRow: '1 / 7',
            gridColumn: '1 / 13',
          },
          '&:nth-child(2)': {
            gridRow: '7 / 10',
            gridColumn: '1 / 5',
          },
          '&:nth-child(3)': {
            gridRow: '7 / 10',
            gridColumn: '5 / 9',
          },
          '&:nth-child(4)': {
            gridRow: '7 / 10',
            gridColumn: '9 / 13',
          },
          '&:nth-child(5)': {
            gridRow: '10 / 13',
            gridColumn: '1 / 5',
          },
          '&:nth-child(6)': {
            gridRow: '10 / 13',
            gridColumn: '5 / 9',
          },
          '&:nth-child(7)': {
            gridRow: '10 / 13',
            gridColumn: '9 / 13',
          },
        },
      },
      // 8 images
      '&[data-length="8"]': {
        gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        '& .element': {
          '&:nth-child(1)': {
            gridRow: '1 / 4',
            gridColumn: '1 / 7',
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
      },
      // 9 images
      '&[data-length="9"]': {
        gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        '& .element': {
          '&:nth-child(1)': {
            gridRow: '1 / 5', // |
            gridColumn: '1 / 5', // -
          },
          '&:nth-child(2)': {
            gridRow: '1 / 5',
            gridColumn: '5 / 9',
          },
          '&:nth-child(3)': {
            gridRow: '1 / 5',
            gridColumn: '9 / 13',
          },
          '&:nth-child(4)': {
            gridRow: '5 / 9',
            gridColumn: '1 / 5',
          },
          '&:nth-child(5)': {
            gridRow: '5 / 9',
            gridColumn: '5 / 9',
          },
          '&:nth-child(6)': {
            gridRow: '5 / 9',
            gridColumn: '9 / 13',
          },
          '&:nth-child(7)': {
            gridRow: '9 / 13',
            gridColumn: '1 / 5',
          },
          '&:nth-child(8)': {
            gridRow: '9 / 13',
            gridColumn: '5 / 9',
          },
          '&:nth-child(9)': {
            gridRow: '9 / 13',
            gridColumn: '9 / 13',
          },
        },
      },
      // 10 images
      '&[data-length="10"]': {
        gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        '& .element': {
          '&:nth-child(1)': {
            gridRow: '1 / 5',
            gridColumn: '1 / 7',
          },
          '&:nth-child(2)': {
            gridRow: '1 / 5',
            gridColumn: '7 / 13',
          },
          '&:nth-child(3)': {
            gridRow: '5 / 9',
            gridColumn: '1 / 4',
          },
          '&:nth-child(4)': {
            gridRow: '5 / 9',
            gridColumn: '4 / 7',
          },
          '&:nth-child(5)': {
            gridRow: '5 / 9',
            gridColumn: '7 / 10',
          },
          '&:nth-child(6)': {
            gridRow: '5 / 9',
            gridColumn: '10 / 13',
          },
          '&:nth-child(7)': {
            gridRow: '9 / 13',
            gridColumn: '1 / 4',
          },
          '&:nth-child(8)': {
            gridRow: '9 / 13',
            gridColumn: '4 / 7',
          },
          '&:nth-child(9)': {
            gridRow: '9 / 13',
            gridColumn: '7 / 10',
          },
          '&:nth-child(10)': {
            gridRow: '9 / 13',
            gridColumn: '10 / 13',
          },
        },
      },
      // 11 images
      '&[data-length="11"]': {
        gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        '& .element': {
          '&:nth-child(1)': {
            gridRow: '1 / 5', // |
            gridColumn: '1 / 5', // -
          },
          '&:nth-child(2)': {
            gridRow: '1 / 5',
            gridColumn: '5 / 9',
          },
          '&:nth-child(3)': {
            gridRow: '1 / 5',
            gridColumn: '9 / 13',
          },
          '&:nth-child(4)': {
            gridRow: '5 / 9',
            gridColumn: '1 / 4',
          },
          '&:nth-child(5)': {
            gridRow: '5 / 9',
            gridColumn: '4 / 7',
          },
          '&:nth-child(6)': {
            gridRow: '5 / 9',
            gridColumn: '7 / 10',
          },
          '&:nth-child(7)': {
            gridRow: '5 / 9',
            gridColumn: '10 / 13',
          },
          '&:nth-child(8)': {
            gridRow: '9 / 13',
            gridColumn: '1 / 4',
          },
          '&:nth-child(9)': {
            gridRow: '9 / 13',
            gridColumn: '4 / 7',
          },
          '&:nth-child(10)': {
            gridRow: '9 / 13',
            gridColumn: '7 / 10',
          },
          '&:nth-child(11)': {
            gridRow: '9 / 13',
            gridColumn: '10 / 13',
          },
        },
      },
      // 12 images
      '&[data-length="12"]': {
        gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        '& .element': {
          '&:nth-child(1)': {
            gridRow: '1 / 4', // |
            gridColumn: '1 / 5', // -
          },
          '&:nth-child(2)': {
            gridRow: '1 / 4',
            gridColumn: '5 / 9',
          },
          '&:nth-child(3)': {
            gridRow: '1 / 4',
            gridColumn: '9 / 13',
          },
          '&:nth-child(4)': {
            gridRow: '4 / 7',
            gridColumn: '1 / 5',
          },
          '&:nth-child(5)': {
            gridRow: '4 / 7',
            gridColumn: '5 / 9',
          },
          '&:nth-child(6)': {
            gridRow: '4 / 7',
            gridColumn: '9 / 13',
          },
          '&:nth-child(7)': {
            gridRow: '7 / 10',
            gridColumn: '1 / 5',
          },
          '&:nth-child(8)': {
            gridRow: '7 / 10',
            gridColumn: '5 / 9',
          },
          '&:nth-child(9)': {
            gridRow: '7 / 10',
            gridColumn: '9 / 13',
          },
          '&:nth-child(10)': {
            gridRow: '10 / 13',
            gridColumn: '1 / 5',
          },
          '&:nth-child(11)': {
            gridRow: '10 / 13',
            gridColumn: '5 / 9',
          },
          '&:nth-child(12)': {
            gridRow: '10 / 13',
            gridColumn: '9 / 13',
          },
        },
      },
    },
  },
  // Container for Sequenced images when Text + Image Group also present
  '& .group.group-images': {
    display: 'contents',
  },

});
