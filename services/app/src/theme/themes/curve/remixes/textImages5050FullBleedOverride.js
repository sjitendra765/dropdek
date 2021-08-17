export const textImages5050FullBleedOverride = (palette) => ({
  '& .container-image': {
    '& .element': {
      borderColor: `${palette.background()} !important`,
    },
    '&:before': {
      backgroundPosition: 'top left !important',
      left: '-0.5%',
      right: 'unset !important',
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='305px' height='2097px' viewBox='0 0 305 2097' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1'%3E%3Cpath id='Path' d='M2 2097 C2 -1 2 0 2 0 L305 0 C305 0 -107.427 738.75 42 2097' fill='${palette.background().replace('#', '%23')}' fill-opacity='1' stroke='none'/%3E%3C/svg%3E")`,
      display: 'block',
      position: 'absolute',
      top: '-0.5%',
      height: '101%',
      width: '40%',
      content: '""',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      zIndex: '2',
    },
    // 2
    '&[data-length="2"]': {
      width: '46% !important',
      border: '0',
      '& .element': {
        position: 'absolute',
        '&:nth-of-type(1)': {
          height: '50% !important',
          border: '0.45em solid',
          borderTop: '0',
          borderLeft: '0',
        },
        '&:nth-of-type(2)': {
          height: '50% !important',
          top: '50% !important',
          border: '0.45em solid',
          borderLeft: '0',
        },
      },
    },
    // 3
    '&[data-length="3"]': {
      width: '46% !important',
      border: '0',
      '& .element': {
        position: 'absolute',
        '&:nth-of-type(1)': {
          height: '60% !important',
          border: '0.45em solid',
          borderTop: '0',
          borderLeft: '0',
        },
        '&:nth-of-type(2)': {
          height: '40% !important',
          width: '50% !important',
          top: '60% !important',
          border: '0.45em solid',
          borderLeft: '0',
        },
        '&:nth-of-type(3)': {
          height: '40% !important',
          width: '50% !important',
          top: '60% !important',
          left: '50% !important',
          border: '0.45em solid',
        },
      },
    },
    // 4
    '&[data-length="4"]': {
      width: '46% !important',
      border: '0',
      '& .element': {
        position: 'absolute',
        '&:nth-of-type(1)': {
          height: '66.6667% !important',
          border: '0.45em solid',
          borderTop: '0',
          borderLeft: '0',
        },
        '&:nth-of-type(2)': {
          height: '33.3334% !important',
          width: '33.3334% !important',
          top: '66.6667% !important',
          border: '0.45em solid',
          borderLeft: '0',
        },
        '&:nth-of-type(3)': {
          height: '33.3334% !important',
          width: '33.3334% !important',
          left: '33.3334% !important',
          top: '66.6667%!important',
          border: '0.45em solid',
        },
        '&:nth-of-type(4)': {
          height: '33.3334% !important',
          width: '33.3334% !important',
          left: '66.6667% !important',
          top: '66.6667% !important',
          border: '0.45em solid',
        },
      },
    },
    // 5
    '&[data-length="5"]': {
      border: '0',
      '& .element': {
        boxSizing: 'border-box',
        border: '0.2em solid',
        '&:nth-of-type(1)': {
          borderTop: '0',
          borderLeft: '0',
          borderRight: '0',
        },
        '&:nth-of-type(2)': {
          borderLeft: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(3)': {
          borderBottom: '0',
        },
        '&:nth-of-type(4)': {
          borderBottom: '0',
        },
        '&:nth-of-type(5)': {
          borderBottom: '0',
          borderRight: '0',
        },
      },
    },
    // 6
    '&[data-length="6"]': {
      border: '0',
      '& .element': {
        boxSizing: 'border-box',
        border: '0.2em solid',
        '&:nth-of-type(1)': {
          borderTop: '0',
          borderLeft: '0',
          borderRight: '0',
        },
        '&:nth-of-type(2)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(3)': {
          borderLeft: '0',
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(4)': {
          borderLeft: '0',
          borderBottom: '0',
          borderTop: '0',
        },
        '&:nth-of-type(5)': {
          border: '0',
        },
        '&:nth-of-type(6)': {
          borderTop: '0',
          borderBottom: '0',
          borderRight: '0',
        },
      },
    },
    // 7
    '&[data-length="7"]': {
      border: '0',
      '& .element': {
        boxSizing: 'border-box',
        border: '0.2em solid',
        '&:nth-of-type(1)': {
          border: '0',
        },
        '&:nth-of-type(2)': {
          borderLeft: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(3)': {
          borderLeft: '0',
          borderRight: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(4)': {
          borderRight: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(5)': {
          borderLeft: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(6)': {
          borderLeft: '0',
          borderRight: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(7)': {
          borderRight: '0',
          borderBottom: '0',
        },
      },
    },
    // 8
    '&[data-length="8"]': {
      border: '0',
      '& .element': {
        border: '0.2em solid',
        '&:nth-of-type(1)': {
          borderLeft: '0',
          borderTop: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(2)': {
          borderRight: '0',
          borderTop: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(3), &:nth-of-type(5), &:nth-of-type(7)': {
          borderLeft: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(4), &:nth-of-type(6), &:nth-of-type(8)': {
          borderRight: '0',
          borderBottom: '0',
        },
      },
    },
    // 9
    '&[data-length="9"]': {
      border: '0',
      '& .element': {
        border: '0.2em solid',
        boxSizing: 'border-box',
        '&:nth-of-type(1)': {
          borderLeft: '0',
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(2)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(3)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(4)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(5)': {
          borderLeft: '0',
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(6)': {
          borderLeft: '0',
          borderTop: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(7)': {
          borderLeft: '0',
          borderTop: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(8)': {
          borderLeft: '0',
          borderTop: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(9)': {
          border: '0',
        },
      },
    },
    // 10
    '&[data-length="10"]': {
      border: '0',
      '& .element': {
        border: '0.2em solid',
        boxSizing: 'border-box',
        '&:nth-of-type(1)': {
          borderLeft: '0',
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(2)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(3)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(4)': {
          borderLeft: '0',
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(5)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(6)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(7)': {
          borderLeft: '0',
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(8)': {
          borderLeft: '0',
          borderTop: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(9)': {
          borderLeft: '0',
          borderTop: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(10)': {
          border: '0',
        },
      },
    },
    // 11
    '&[data-length="11"]': {
      border: '0',
      '& .element': {
        border: '0.2em solid',
        boxSizing: 'border-box',
        '&:nth-of-type(1)': {
          borderLeft: '0',
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(2)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(3)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(4)': {
          borderLeft: '0',
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(5)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(6)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(7)': {
          borderLeft: '0',
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(8)': {
          borderLeft: '0',
          borderTop: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(9)': {
          borderLeft: '0',
          borderTop: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(10)': {
          borderLeft: '0',
          borderTop: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(11)': {
          border: '0',
        },
      },
    },
    // 12
    '&[data-length="12"]': {
      border: '0',
      '& .element': {
        border: '0.2em solid',
        boxSizing: 'border-box',
        '&:nth-of-type(1)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(2)': {
          borderLeft: '0',
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(3)': {
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(4)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(5)': {
          borderLeft: '0',
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(6)': {
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(7)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(8)': {
          borderLeft: '0',
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(9)': {
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(10)': {
          borderLeft: '0',
          borderTop: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(11)': {
          border: '0',
        },
        '&:nth-of-type(12)': {
          borderRight: '0',
          borderTop: '0',
          borderBottom: '0',
        },
      },
    },
  },
  '& .group.img-text': {
    '& .container.container-image': {
      maxHeight: '12em !important',
      gridGap: '0.5em !important',
      '&:before': {
        width: 0,
      },
      '& img': {
        borderRadius: '0.5em !important',
      },
    },
  },
});
